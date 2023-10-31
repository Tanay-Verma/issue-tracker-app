/*
  Warnings:

  - The `status` column on the `Issue` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "StatusNew" AS ENUM ('CLOSED', 'IN_PROGRESS', 'OPEN');

-- AlterTable
ALTER TABLE "Issue" DROP COLUMN "status",
ADD COLUMN     "status" "StatusNew" NOT NULL DEFAULT 'OPEN';

-- DropEnum
DROP TYPE "Status";
