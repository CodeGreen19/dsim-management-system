"use server";

import { db } from "@/drizzle/db";
import { studentFees } from "@/drizzle/schemas/students";
import { handleServerError } from "@/lib/handle-server-error";
import { studentFeesSchema } from "../schema/fees.schema";
import { StudentFeesSchemaType } from "../types";
import { eq } from "drizzle-orm";

export const createStudentFees = async ({
  feesInfo,
  studentId,
}: {
  feesInfo: StudentFeesSchemaType;
  studentId: string;
}) => {
  return await db.transaction(async (tx) => {
    try {
      const { success, data } = studentFeesSchema.safeParse(feesInfo);
      if (!success) {
        return { message: "Invalid data !" };
      }
      //insert data
      await tx.insert(studentFees).values({
        mealFees: Number(data.meal_fees),
        educationFees: Number(data.education_fee),
        month: data.month,
        year: data.year,
        studentId,
      });
      return { message: "New Record Created " };
    } catch (error) {
      return handleServerError(error);
    }
  });
};

export const getFeesRecords = async (studentId: string) => {
  return await db
    .select()
    .from(studentFees)
    .where(eq(studentFees.studentId, studentId));
};
