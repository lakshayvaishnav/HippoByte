import { getPayloadClient } from "../get-payload";
import { AuthCredentialsValidator } from "../lib/validators/account-credentials-validator";
import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "./trpc";

export const authRouter = router({
  createPaylodUser: publicProcedure
    .input(AuthCredentialsValidator)
    .mutation(async ({ input }) => {
      const { email, password } = input;
      const payload = await getPayloadClient();
      //check if user already exists.
      const { docs: users } = await payload.find({
        collection: "users",
        where: {
          email: {
            equals: email,
          },
        },
      });
      if (users.length !== 0) {
        throw new TRPCError({ code: "CONFLICT" });
      }
      await payload.create({
        collection: "users",
        data: { email, password, role: "user" },
      });
      console.log("created...");

      return { success: true, sentToEmail: email };
    }),
});
