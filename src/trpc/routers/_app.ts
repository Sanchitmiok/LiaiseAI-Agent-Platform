import { meetingsRouter } from "@/modules/meetings/server/procedures";
import { createTRPCRouter } from "../init";
import { agentsRouter } from "@/modules/agents/server/procedures";
import { premiumRouter } from "@/modules/premium/server/procedures";


// agents , meetings, premium ye sab routers hain
// They are used to manage agents, meetings, and premium features in the application
export const appRouter = createTRPCRouter({
  agents: agentsRouter,
  meetings: meetingsRouter,
  premium: premiumRouter,
});


//Yeh line sabse important hai. Yeh aapke poore API router ka type export karti hai, jisko frontend directly import karke use karega. Yahi tRPC ka magic hai!
export type AppRouter = typeof appRouter;
