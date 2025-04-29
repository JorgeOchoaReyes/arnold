/*
  Warnings:

  - Added the required column `description` to the `InterviewRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `InterviewRecord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InterviewRecord" ADD COLUMN     "characteristics" TEXT[],
ADD COLUMN     "companySimilarTo" TEXT[],
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;
