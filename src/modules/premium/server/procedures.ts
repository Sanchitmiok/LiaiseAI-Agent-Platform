import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { polarClient } from "@/lib/polar";
import { db } from "@/db";
import { count, eq } from "drizzle-orm";
import { agents, meetings } from "@/db/schema";
import { TRPCError } from "@trpc/server";

export const premiumRouter = createTRPCRouter({
  getFreeUsage: protectedProcedure.query(async ({ ctx }) => {
    let isPremiumUser = false;
    
    try {
      const customer = await polarClient.customers.getStateExternal({
        externalId: ctx.auth.user.id,
      });

      const subscription = customer?.activeSubscriptions?.[0];
      isPremiumUser = !!subscription;
    } catch (error) {
      console.log("Customer not found in Polar, treating as free user", error);
    }

    const [userMeetings] = await db
      .select({
        count: count(meetings.id),
      })
      .from(meetings)
      .where(eq(meetings.userId, ctx.auth.user.id));

    const [userAgents] = await db
      .select({
        count: count(agents.id),
      })
      .from(agents)
      .where(eq(agents.userId, ctx.auth.user.id));

    return {
      meetingCount: userMeetings.count,
      agentCount: userAgents.count,
      isPremium: isPremiumUser,
    };
  }),
  getProducts: protectedProcedure.query(async () => {
    try {
      const products = await polarClient.products.list({
        isArchived: false,
        isRecurring: true,
        sorting: ["price_amount"],
      });

      return products.result.items;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch products",
        cause: error,
      });
    }
  }),
  getCurrentSubscription: protectedProcedure.query(async ({ ctx }) => {
    try {
      const customer = await polarClient.customers.getStateExternal({
        externalId: ctx.auth.user.id,
      });

      const subscription = customer?.activeSubscriptions?.[0];
      if (!subscription) return null;

      const product = await polarClient.products.get({
        id: subscription.productId,
      });

      return product;
    } catch (error) {
      // If customer doesn't exist or API fails, return null (no subscription)
      console.log("Failed to get subscription:", error);
      return null;
    }
  }),
});
