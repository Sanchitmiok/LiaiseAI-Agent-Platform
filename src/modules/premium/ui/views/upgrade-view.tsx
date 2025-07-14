"use client";
import ErrorState from "@/components/ErrorState";
import Loading from "@/components/Loading";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
import { PricingCard } from "../components/pricing-card";
import { authClient } from "@/lib/auth-client";

export const UpgradeView = () => {
  const trpc = useTRPC();
  const { data: products } = useSuspenseQuery(
    trpc.premium.getProducts.queryOptions()
  );
  const { data: currentSubscription } = useSuspenseQuery(
    trpc.premium.getCurrentSubscription.queryOptions()
  );
  const Plan = currentSubscription?.name || "Free";

  return (
    <div className="h-fit pt-5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto pb-10 ">
        {/* Header Section */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
            <svg
              className="w-6 h-6 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <div className="space-y-2">
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              You are currently on the{" "}
              <span className="font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                {currentSubscription?.name ?? "Free"}
              </span>{" "}
              plan
            </p>
            {
              Plan === "Free" && (
                <p className="text-sm sm:text-base text-gray-500 max-w-xl mx-auto">
                  Upgrade to unlock premium features and take your experience to
                  the next level
                </p>
              )
            }{
              Plan !== "Free" && (
                <p className="text-sm sm:text-base text-gray-500 max-w-xl mx-auto">
                  Manage your subscription or upgrade to a different plan
                </p>
              )
            }
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product) => {
            // console.log(index)
            const isCurrentProduct = currentSubscription?.id === product.id;
            const isPremium = !!currentSubscription;
            let buttonText = "Upgrade";
            // console.log("Current Subscription:", currentSubscription);
            let onSubscribe = () =>
              authClient.checkout({ products: [product.id] });

            if (isCurrentProduct) {
              console.log("Product:", product);
              buttonText = "Manage Subscription";
              onSubscribe = () => authClient.customer.portal();
            } else if (isPremium) {
              buttonText = "Upgrade to this Plan";
              onSubscribe = () => authClient.customer.portal();
            }

            return (
                <div key={product.id} className="w-full h-full flex lg:hover:scale-105 lg:hover:shadow-xl lg:transition-all lg:duration-300">
                <PricingCard
                  title={product.name}
                  description={product.description}
                  variant={
                  product.metadata?.variant === "highlighted"
                    ? "highlighted"
                    : "default"
                  }
                  price={
                  product.prices?.[0]?.amountType == "fixed"
                    ? product.prices[0].priceAmount / 100
                    : 0
                  }
                  priceSuffix={`/${
                  product.prices?.[0]?.recurringInterval || ""
                  }`}
                  features={product.benefits.map(
                  (benefit) => benefit.description
                  )}
                  badge={product?.metadata?.badge as string | null}
                  buttonText={buttonText}
                  onSubscribe={onSubscribe}
                />
                </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const UpgradeViewLoading = () => {
  return (
    <Loading
      title="Loading subscription plans"
      description="Please wait for few seconds..."
    />
  );
};

export const UpgradeViewError = () => {
  return (
    <ErrorState
      title="Error"
      description="Oops! Something went wrong while loading subscription plans."
    />
  );
};
