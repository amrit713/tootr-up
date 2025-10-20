import { useParams } from "next/navigation";

export const useStudentId = () => {
    const params = useParams();

    return params.studentId as string;
};