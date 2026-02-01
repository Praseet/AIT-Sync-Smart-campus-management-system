import { Student, HostelApplication } from '../types';

/**
 * Calculates the Merit Score for hostel allocation based on the "Merit-Need" Formula.
 * 
 * Formula:
 * 1. Academic Weight (Max 50): (CGPA / 10) * 50
 * 2. Attendance Weight (Max 20): (Attendance / 100) * 20
 * 3. Discipline Penalty: 0 cases = 0, 1 case = -10, 2+ cases = -50
 * 4. Locality Weight: Local = -30, Outsider = +20
 */
export const calculateHostelScore = (student: Student): HostelApplication['breakdown'] & { total: number } => {
  
  // 1. Academic Weight
  const merit = (Math.min(10, Math.max(0, student.cgpa)) / 10) * 50;

  // 2. Attendance Weight
  const attendance = (Math.min(100, Math.max(0, student.attendance)) / 100) * 20;

  // 3. Discipline Penalty
  let discipline = 0;
  if (student.discipline_records === 1) discipline = -10;
  else if (student.discipline_records >= 2) discipline = -50;

  // 4. Locality Weight
  const locality = student.is_local_resident ? -30 : 20;

  const total = parseFloat((merit + attendance + discipline + locality).toFixed(2));

  return {
    merit: parseFloat(merit.toFixed(1)),
    attendance: parseFloat(attendance.toFixed(1)),
    discipline,
    locality,
    total
  };
};

export const getStatusColor = (score: number): string => {
  if (score >= 60) return "text-emerald-500 dark:text-emerald-400";
  if (score >= 40) return "text-amber-500 dark:text-amber-400";
  return "text-red-500 dark:text-red-400";
};