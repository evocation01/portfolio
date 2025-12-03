import { hash } from "bcryptjs";
import { db } from "../lib/db";
import "../lib/envConfig"; // Load environment variables first
import { users } from "../lib/schema";

async function main() {
    const email = "hakanispir2004@gmail.com"; // CHANGE THIS to your actual email
    const password = "H1998-2004h"; // CHANGE THIS to your desired password

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

        console.log("✅ Admin user created successfully!");
        console.log(`📧 Email: ${email}`);
        console.log(`🔑 Password: ${password}`);
    } catch (error) {
        console.error("❌ Error seeding user:", error);
        process.exit(1);
    }

    process.exit(0);
}

main();
