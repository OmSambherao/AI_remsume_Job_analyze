import axios from 'axios';

const api = axios.create({
    baseURL: "https://ai-resume-job-analyze-backend.onrender.com",
    withCredentials: true
});

export const generateInterviewReport = async({ jobDescription, resume, selfDescription}) => {
    const formData = new FormData();
    formData.append("jobDescription", jobDescription);
    formData.append("resume", resume);
    formData.append("selfDescription", selfDescription);

    const response = await api.post( "/api/interview" , formData , {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

    return response.data ; 
};

export const getInterviewReportByID = async (InterviewID)=>{
    const response = await api.get(`/api/interview/report/${InterviewID}`);
    return response.data ;
};

export const getAllInterviewReports = async ()=>{
    const response = await api.get("/api/interview");
    return response.data ;
};
