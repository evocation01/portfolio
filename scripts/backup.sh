#!/bin/bash
# A script to back up the Vercel (Neon) Postgres database.

# Set the directory where backups will be stored
BACKUP_DIR="backups"
# Set the filename for the backup, with a timestamp
DATE=$(date +"%Y-%m-%d_%H-%M-%S")
BACKUP_FILE="$BACKUP_DIR/backup_$DATE.sql"

# Load environment variables from .env.local
# This is a simple parser, which might not handle all .env edge cases.
if [ -f .env.local ]; then
    export $(grep -v '^#' .env.local | xargs)
fi

# Check if POSTGRES_URL is set
if [ -z "$POSTGRES_URL" ]; then
    echo "Error: POSTGRES_URL is not set. Please add it to your .env.local file."
    exit 1
fi

echo "Starting database backup..."

# Use pg_dump to create the backup.
# The command requires psql client tools to be installed.
# It uses the POSTGRES_URL for connection.
pg_dump "$POSTGRES_URL" > "$BACKUP_FILE"

# Check if the backup was successful
if [ $? -eq 0 ]; then
    echo "✅ Backup successful!"
    echo "Backup file created at: $BACKUP_FILE"
    # Optional: Gzip the backup to save space
    gzip "$BACKUP_FILE"
    echo "Backup file compressed to: $BACKUP_FILE.gz"
else
    echo "❌ Backup failed."
    # Remove the failed backup file
    rm "$BACKUP_FILE"
    exit 1
fi

# Optional: Clean up old backups (e.g., older than 7 days)
# find $BACKUP_DIR -type f -name "*.gz" -mtime +7 -delete
# echo "Old backups (older than 7 days) have been deleted."

echo "Backup process finished."
