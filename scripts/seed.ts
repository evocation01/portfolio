import { hash } from "bcryptjs";
import { db } from "../lib/db";
import "../lib/envConfig"; // Load environment variables first
import { users } from "../lib/schema";

async function main() {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
        console.error(
            "❌ Error: Please set ADMIN_EMAIL and ADMIN_PASSWORD in your .env file."
        );
        process.exit(1);
    }

    console.log("⏳ Seeding admin user...");

    try {
        const hashedPassword = await hash(password, 12);

        await db
            .insert(users)
            .values({
                email,
                hashedPassword,
                name: "Admin",
                emailVerified: new Date(),
            })
            .onConflictDoUpdate({
                target: users.email,
                set: { hashedPassword }, // Update password if user already exists
            });

        console.log("✅ Admin user created/updated successfully!");
        console.log(`📧 Email: ${email}`);
    } catch (error) {
        console.error("❌ Error seeding user:", error);
        process.exit(1);
    }

    process.exit(0);
}

main();
