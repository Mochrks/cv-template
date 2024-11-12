"use client";

import React, { useEffect, useState } from "react";
import { Box, Divider, Stack, Typography } from "@mui/material";
import UploadFile from "@/components/UploadFile";
import InfoComponent from "@/components/InfoComponent";

interface DataType {

  certifications: string[];
  education: Education[];
  employee: Employee;
  employment: Employment[];
  skills: string[];
}

interface SectionTitleProps {
  title: string;
}

interface PositionDetails {
  projectTitle: string;
  bullets: string[];
}

interface Position {
  title: string;
  duration: string;
  details: PositionDetails[];
}

interface Employment {
  company: string;
  location: string;
  summary: string;
  skills: string;
  positions: Position[];
}

interface Education {
  degree: string;
  school: string;
  duration: string;
}

interface Certifications {
  certifications: string[];
}

interface Employee {
  name: string;
  position: string;
  email: string;
  phone: string;
  linkedin: string;
}

interface JsonData {
  employee: Employee;
  skills: string[];
  employment: Employment[];
  education: Education[];
  certifications: string[];
}


// Component to display section titles
const SectionTitle = ({ title }: SectionTitleProps) => (
  <Box sx={{ marginBottom: "10px", marginTop: "10px" }}>
    <Typography
      variant="h6"
      sx={{
        fontWeight: "bold",
        textTransform: "uppercase",
        fontSize: "14px",
        marginBottom: "5px",
      }}
    >
      {title}
    </Typography>
    <Divider sx={{ borderColor: "#000", borderWidth: "1px" }} />
  </Box>
);

// Component to display skills
const Skills = ({ skills }: { skills: string[] }) => (
  <Box sx={{ padding: "0px 0" }}>
    <SectionTitle title="Skills" />
    <Box>
      <ul style={{ paddingLeft: "0", marginTop: "0", listStyle: "none" }}>
        {skills.map((skill: string, index: number) => {
          const [category, details] = skill.split(": ");
          return (
            <li key={index} style={{ display: "flex", marginBottom: "3px" }}>
              <Typography
                variant="body2"
                sx={{ minWidth: "250px", paddingRight: "15px", whiteSpace: "nowrap" }}
              >
                {category}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  whiteSpace: "normal",
                  lineHeight: 1.5,
                  textIndent: "-7px",
                  paddingLeft: "10px",
                }}
              >
                : {details}
              </Typography>
            </li>
          );
        })}
      </ul>
    </Box>
  </Box>
);

// Component to display employment history
const ProfessionalExperience = ({ employment }: { employment: Employment[] }) => {
  return (
    <Box sx={{ padding: '5px 0' }}>
      <SectionTitle title="Professional Experience" /> {/* Judul dengan garis pemisah */}
      {employment.map((job: Employment, index: number) => (
        <Box key={index} sx={{ marginBottom: '30px' }}>
          {/* Nama perusahaan dan lokasi */}
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography
              variant="body1"
              sx={{
                fontWeight: 'bold',
                fontSize: '16px',
                display: 'inline-block',
              }}
            >
              {job.company}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#000', fontSize: '16px', whiteSpace: 'nowrap' }}>
              {job.location}
            </Typography>
          </Stack>

          {/* Deskripsi singkat tentang perusahaan */}
          <Typography variant="body2" sx={{ color: '#000', fontSize: '15px', marginBottom: '5px', marginTop: '5px' }}>
            {job.summary}
          </Typography>

          {/* Daftar skill yang digunakan di pekerjaan tersebut */}
          <Typography variant="body2" sx={{ color: '#000', fontSize: '15px', marginBottom: '10px', fontStyle: 'italic' }}>
            {job.skills}
          </Typography>

          {/* Posisi yang dijabat di perusahaan */}
          {job.positions.map((position: Position, idx: number) => (
            <Box key={idx} sx={{ marginTop: '8px', marginBottom: '8px' }}>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ marginBottom: '2px' }}>
                {/* Nama posisi dan durasi */}
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#000', fontSize: '15px' }}>
                  {position.title}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#000', fontSize: '15px', whiteSpace: 'nowrap' }}>
                  {position.duration}
                </Typography>
              </Stack>

              {/* Detail proyek di dalam posisi tersebut */}
              {position.details.map((detail: PositionDetails, i: number) => (
                <Box key={i} sx={{ marginTop: '10px', marginBottom: '10px' }}>
                  {/* Judul proyek dengan garis di bawah */}
                  <Typography variant="body2" sx={{ color: '#000', fontSize: '15px', lineHeight: 1.5 }}>
                    {detail.projectTitle}
                  </Typography>
                  <Divider sx={{ borderColor: '#000', borderWidth: '1px', marginBottom: '10px' }} />
                  <ul style={{ paddingLeft: '20px', marginTop: '0' }}>
                    {/* Daftar poin-poin pencapaian */}
                    {detail.bullets.map((bullet: string, j: number) => (
                      <li key={j} style={{ marginBottom: '5px' }}>
                        <Typography variant="body2" sx={{ color: '#000', fontSize: '15px', lineHeight: 1.5 }}>
                          {bullet}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
};

// Component to display education
const Education = ({ education }: { education: Education[] }) => (
  <Box sx={{ marginTop: "8px" }}>
    <SectionTitle title="Education" />
    {education.map((edu: Education, index: number) => (
      <Box key={index} sx={{ marginBottom: "8px" }}>
        <Typography variant="body1" sx={{ fontWeight: "bold", fontSize: "15px" }}>
          {edu.degree}
        </Typography>
        <Typography variant="body1" sx={{ fontSize: "15px", marginTop: "3px" }}>
          {edu.school} - {edu.duration}
        </Typography>
      </Box>
    ))}
  </Box>
);

// Component to display certifications
const Certifications = ({ certifications }: { certifications: string[] }) => (
  <Box sx={{ marginTop: "17px" }}>
    <SectionTitle title="Certifications" />
    <ul style={{ paddingLeft: "22px", margin: 0 }}>
      {certifications.map((cert: string, index: number) => (
        <li key={index} style={{ marginBottom: "3px", listStyle: "disc", fontWeight: "bold" }}>
          <Typography variant="body1" sx={{ fontSize: "15px", lineHeight: 1.5 }}>
            {cert}
          </Typography>
        </li>
      ))}
    </ul>
  </Box>
);



const template = [
  {
    "employee": {
      "name": "Budi Santoso",
      "position": "Software Engineer",
      "email": "budi.santoso@example.com",
      "phone": "+62 812-3456-7890",
      "linkedin": "https://www.linkedin.com/in/budi-santoso"
    },
    "skills": [
      "Programming: Java, Python, JavaScript",
      "Web Development: HTML, CSS, React",
      "Database Management: MySQL, MongoDB"
    ],
    "employment": [
      {
        "company": "PT. Teknologi Canggih",
        "location": "Jakarta, Indonesia",
        "summary": "Perusahaan yang bergerak di bidang pengembangan perangkat lunak.",
        "skills": "Java, Spring Boot, REST API",
        "positions": [
          {
            "title": "Senior Software Engineer",
            "duration": "Januari 2020 - Sekarang",
            "details": [
              {
                "projectTitle": "Sistem Manajemen Proyek",
                "bullets": [
                  "Mengembangkan aplikasi web menggunakan Spring Boot dan React.",
                  "Berkolaborasi dengan tim desain untuk meningkatkan pengalaman pengguna.",
                  "Menerapkan pengujian otomatis untuk meningkatkan kualitas perangkat lunak."
                ]
              }
            ]
          }
        ]
      },
      {
        "company": "PT. Solusi Digital",
        "location": "Bandung, Indonesia",
        "summary": "Perusahaan yang fokus pada solusi digital dan aplikasi mobile.",
        "skills": "Android Development, Firebase",
        "positions": [
          {
            "title": "Junior Mobile Developer",
            "duration": "Juli 2018 - Desember 2019",
            "details": [
              {
                "projectTitle": "Aplikasi Mobile E-Commerce",
                "bullets": [
                  "Berkontribusi dalam pengembangan aplikasi Android menggunakan Kotlin.",
                  "Mengintegrasikan API untuk sistem pembayaran.",
                  "Melakukan debugging dan pengujian aplikasi."
                ]
              }
            ]
          }
        ]
      }
    ],
    "education": [
      {
        "school": "Universitas Indonesia",
        "degree": "Sarjana Teknik Informatika",
        "duration": "2014 - 2018"
      }
    ],
    "certifications": [
      "Certified Java Programmer (2020)",
      "AWS Certified Solutions Architect (2021)"
    ]
  }
]


// Main component
export default function Home() {
  const [data, setData] = useState<JsonData | null>(null);
  const handleDataReceived = (receivedData: DataType) => {
    setData(receivedData);
  };

  useEffect(() => {
    setData(template[0]);
  }, []);


  return (
    <Box sx={{ padding: "30px", fontFamily: "Arial, sans-serif", backgroundColor: "#ffffff", lineHeight: 1.5 }} className="page">
      {/* Template and Input JSON Data */}
      <Box sx={{ marginBottom: "20px" }} className="no-print">
        {/* upload files */}
        <UploadFile onDataReceived={handleDataReceived} />
      </Box>

      {/* Conditional rendering for content after JSON submission */}
      {data && (
        <>
          {/* Header Section */}
          <Box sx={{ textAlign: "center", marginBottom: "10px" }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", fontSize: "18px", letterSpacing: "1.2px" }}>
              {data.employee.name}
            </Typography>
            <Typography variant="h6" sx={{ fontSize: "14px", fontWeight: "bold" }}>
              {data.employee.position}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "11px" }}>
              {data.employee.email} • {data.employee.phone} • {data.employee.linkedin}
            </Typography>
          </Box>

          {/* Skills Section */}
          <Skills skills={data.skills} />

          {/* Professional Experience Section */}
          <ProfessionalExperience employment={data.employment} />

          {/* Education Section */}
          <Education education={data.education} />

          {/* Certifications Section */}
          <Certifications certifications={data.certifications} />
        </>
      )}

      <Box className="no-print">
        <InfoComponent />
      </Box>
    </Box>
  );
};

