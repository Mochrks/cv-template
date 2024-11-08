export const CV_STRUCTURE = `{
  "employee": {
    "name": "Your Name",
    "position": "Your Position",
    "email": "Your Email",
    "phone": "Your Phone",
    "image": "Image URL",
    "biodata": {
      "profile": "Profile description",
      "objective": "Objectives or skills",
      "placeOfBirth": "Place of Birth",
      "dateOfBirth": "YYYY-MM-DD",
      "gender": "Male/Female"
    }
  },
  "histories": {
    "employment": [
      {
        "employer": "Employer Name",
        "position": "Position",
        "from": "Start Year",
        "to": "End Year or Present"
      }
    ],
    "certification": [
      {
        "title": "Certification Title",
        "provider": "Provider",
        "date": "Completion Date",
        "duration": "Duration",
        "certificate": "Yes/No"
      }
    ],
    "education": [
      {
        "school": "School Name",
        "degree": "Degree",
        "subject": "Subject",
        "from": "Start Year",
        "to": "End Year",
        "GPA": "GPA (optional)"
      }
    ],
    "project": [
      {
        "projectName": "Project Name",
        "role": "Role",
        "from": "Start Date",
        "to": "End Date or Present",
        "customer": "Customer",
        "projectDescription": "Project description",
        "technicalInformation": "Technical info or tools used",
        "jobDescription": "Responsibilities in the project"
      }
    ]
  }
}
`;


export const CV_STRUCTURE_INSTRUCTIONS = `
Extract information from the PDF CV to convert it into a structured JSON format. Follow the specific JSON format below, and ensure each section includes as much detail as available from the CV content. Each part, such as work experience, education, skills, and projects, should be organized thoroughly according to the PDF content.

The JSON structure you should follow is:

${CV_STRUCTURE}

Return only the structured JSON data in response.
`;