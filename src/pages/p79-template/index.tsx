"use client";

import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, Divider, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography, } from '@mui/material';
import UploadFile from '@/components/UploadFile';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Print from '@/components/Print';
import ListUpload from '@/components/ListUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

// Interfaces for data types
interface Project {
    projectName: string;
    role: string;
    from: string;
    to: string;
    customer: string;
    projectDescription: string;
    technicalInformation: string;
    jobDescription: string;
}

// Interfaces data types
interface DataType {
    employee: {
        name: string;
        position: string;
        email: string;
        phone: string;
        image: string;
        biodata: {
            profile: string;
            objective: string;
            placeOfBirth: string;
            dateOfBirth: string;
            gender: string;
        };
    };
    histories: {
        employment: {
            employer: string;
            position: string;
            from: string;
            to: string;
        }[];
        certification: {
            title: string;
            provider: string;
            date: string;
            duration: string;
            certificate: string;
        }[];
        education: {
            school: string;
            degree: string;
            subject: string;
            from: string;
            to: string;
            GPA?: string;
        }[];
        project: Project[];
    };
}

// Personal Info Section Component
const PersonalInfoSection = ({ data }: { data: DataType }) => {
    const [avatarImage, setAvatarImage] = useState<string | null>(null);


    useEffect(() => {
        const savedImage = localStorage.getItem('employeeAvatar');
        if (savedImage) {
            setAvatarImage(savedImage);
        }
    }, []);


    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Image = reader.result as string;
                setAvatarImage(base64Image);
                // Set  localStorage
                localStorage.setItem('employeeAvatar', base64Image);
            };
            reader.readAsDataURL(file);
        }
    };


    const handleRemoveImage = () => {
        setAvatarImage(null);
        localStorage.removeItem('employeeAvatar');
    };

    return (
        <Stack direction="row" alignItems="center">
            <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h5" sx={{ py: 1 }}>
                    <strong>{data?.employee.name || 'No Name'}</strong>
                </Typography>
                <Divider sx={{ borderBottomWidth: 2, borderColor: '#000000', marginTop: 1 }} />
                <Typography variant="subtitle1">{data?.employee.position || 'No Position'}</Typography>
                <Typography variant="subtitle2">{data?.employee.email || 'No Email'}</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar
                    src={avatarImage || data?.employee.image || ''}
                    sx={{ height: 150, width: 150, mb: 1 }}
                >
                    {avatarImage || data?.employee.image ? 'Talent Image' : 'No Image'}
                </Avatar>

                {/* Input file */}
                <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="avatar-upload"
                    onChange={handleImageUpload}
                />

                <Box sx={{ display: 'flex', gap: 1, marginY: 1 }} className="no-print">
                    {/* upload */}
                    <label htmlFor="avatar-upload">
                        <Button
                            variant="contained"
                            component="span"
                            size="small"
                            color="primary"
                            startIcon={<AddAPhotoIcon />}
                        >
                            Photo
                        </Button>
                    </label>

                    {/* delete */}
                    {(avatarImage || data?.employee.image) && (
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={handleRemoveImage}
                            color="error"

                        >
                            <DeleteIcon />
                        </Button>
                    )}
                </Box>
            </Box>
        </Stack>
    );
};

// Employment Section Component
const EmploymentSection = ({ employment }: { employment: DataType['histories']['employment'] }) => (
    <Stack direction="column" spacing={1} sx={{ flexBasis: '54%' }}>
        <Typography variant="body1" sx={{ pt: 1 }}>
            <strong>Employment</strong>
        </Typography>
        <Divider sx={{ borderBottomWidth: 2, borderColor: '#000000', marginTop: 1 }} />
        <Stack direction="column" spacing={1}>
            {employment.map((job, index) => (
                <Box
                    key={index}
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                    }}
                >
                    <Box>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                            {job.employer}
                        </Typography>
                        <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
                            {job.position}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-end',
                            textAlign: 'right',
                        }}
                    >
                        <Typography variant="body2">
                            {job.from} - {job.to ? job.to : 'Present'}
                        </Typography>
                    </Box>
                </Box>
            ))}
        </Stack>
    </Stack>
);

// Objective Section Component
const ObjectiveSection = ({ biodata }: { biodata: DataType['employee']['biodata'] }) => (
    <Stack direction="column" spacing={1} sx={{ flexBasis: '50%' }}>
        <Typography variant="body1" sx={{ pt: 1 }}>
            <strong>Objective</strong>
        </Typography>
        <Divider sx={{ borderBottomWidth: 2, borderColor: '#000000', marginTop: 1 }} />
        <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
            {biodata?.profile || 'No profile available.'}
        </Typography>

        <Typography variant="body2" sx={{ pt: 2 }}>
            <strong>Keahlian saya:</strong> {biodata?.objective || 'No skills listed.'}
        </Typography>

        <Typography variant="body1" sx={{ pt: 1 }}>
            <strong>Personal Detail</strong>
        </Typography>
        <Divider sx={{ borderBottomWidth: 2, borderColor: '#000000', marginTop: 0 }} />
        <Table size="small">
            <TableBody>
                <TableRow>
                    <TableCell sx={{ p: 0, border: 0 }}>
                        <Typography variant="body2">
                            <strong>Place of Birth:</strong> {biodata?.placeOfBirth || 'N/A'}
                        </Typography>
                    </TableCell>
                    <TableCell sx={{ p: 0, border: 0 }}>
                        <Typography variant="body2">
                            <strong>Gender:</strong> {biodata?.gender || 'N/A'}
                        </Typography>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell sx={{ p: 0, border: 0 }}>
                        <Typography variant="body2">
                            <strong>Date of Birth:</strong> {biodata?.dateOfBirth || 'N/A'}
                        </Typography>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </Stack>
);

// Project Section Component
const ProjectSection = ({ projects }: { projects: Project[] }) => {
    return (
        <Stack direction="column" spacing={2} sx={{ width: '100%', pb: 4 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold', pt: 1 }}>
                PROJECT
            </Typography>
            <Box
                sx={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    marginTop: '16px',
                    padding: '0',
                }}
            >
                <Table className="project-table" sx={{ width: '100%', borderCollapse: 'collapse' }}>
                    {projects.map((project, index) => (
                        <React.Fragment key={index}>
                            <TableHead
                                className="project-heading"
                                sx={{
                                    pageBreakInside: 'avoid',
                                    pageBreakBefore: index !== 0 ? 'always' : 'auto'
                                }}
                            >
                                <TableRow>
                                    <TableCell className="shaded-project-heading" colSpan={1}>
                                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                            {index + 1}. Project Name:
                                        </Typography>
                                    </TableCell>
                                    <TableCell className="shaded-project-heading" colSpan={5}>
                                        <Typography variant="body2">
                                            <strong>{project.projectName}</strong>
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody sx={{ pageBreakInside: 'avoid' }}>
                                <TableRow>
                                    <TableCell className="shaded-cell">
                                        <Typography variant="body2">Role:</Typography>
                                    </TableCell>
                                    <TableCell className="white-background">
                                        <Typography variant="body2">{project.role}</Typography>
                                    </TableCell>
                                    <TableCell className="from-to-label">
                                        <Typography variant="body2">From:</Typography>
                                    </TableCell>
                                    <TableCell className="shaped-cell white-background">
                                        <Typography variant="body2">{project.from}</Typography>
                                    </TableCell>
                                    <TableCell className="from-to-label">
                                        <Typography variant="body2">To:</Typography>
                                    </TableCell>
                                    <TableCell className="shaped-cell white-background">
                                        <Typography variant="body2">{project.to}</Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="shaded-cell">
                                        <Typography variant="body2">Customer:</Typography>
                                    </TableCell>
                                    <TableCell className="white-background" colSpan={5}>
                                        <Typography variant="body2">{project.customer}</Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="shaded-cell">
                                        <Typography variant="body2">Project Desc:</Typography>
                                    </TableCell>
                                    <TableCell className="white-background" colSpan={5}>
                                        <Typography variant="body2">{project.projectDescription}</Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="shaded-cell">
                                        <Typography variant="body2">Technical Info:</Typography>
                                    </TableCell>
                                    <TableCell className="white-background" colSpan={5}>
                                        <Typography variant="body2">{project.technicalInformation}</Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="shaded-cell">
                                        <Typography variant="body2">Job Description:</Typography>
                                    </TableCell>
                                    <TableCell className="white-background" colSpan={5}>
                                        <ul>
                                            {project.jobDescription.split('\n').map((desc, idx) => (
                                                <li key={idx}>
                                                    <Typography variant="body2">{desc}</Typography>
                                                </li>
                                            ))}
                                        </ul>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </React.Fragment>
                    ))}
                </Table>
            </Box>
        </Stack>
    );
};

// Education and Certification Section
const EducationAndCertification = ({ data }: { data: DataType }) => (
    <Stack direction="row" spacing={3} justifyContent="stretch" sx={{ pb: 2, pageBreakAfter: 'always' }}>
        <Stack direction="column" spacing={1} sx={{ flexBasis: '50%' }}>
            <Typography variant="body1" sx={{ pt: 1 }}>
                <strong>Course, Training</strong>
            </Typography>
            <Divider sx={{ borderBottomWidth: 2, borderColor: '#000000', marginTop: 1 }} />
            <Table size="small">
                <TableHead>
                    <TableRow>
                        {['No', 'Title', 'Provider', 'Date', 'Duration', 'Certificate'].map((header) => (
                            <TableCell key={header} sx={{ p: 1 }}>
                                <Typography variant="caption">
                                    <strong>{header}</strong>
                                </Typography>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.histories.certification.map((certification, index) => (
                        <TableRow key={index}>
                            <TableCell sx={{ p: 1 }}>
                                <Typography variant="caption">{index + 1}</Typography>
                            </TableCell>
                            <TableCell sx={{ p: 1 }}>
                                <Typography variant="caption">{certification.title}</Typography>
                            </TableCell>
                            <TableCell sx={{ p: 1 }}>
                                <Typography variant="caption">{certification.provider}</Typography>
                            </TableCell>
                            <TableCell sx={{ p: 1 }}>
                                <Typography variant="caption">{certification.date}</Typography>
                            </TableCell>
                            <TableCell sx={{ p: 1 }}>
                                <Typography variant="caption">{certification.duration}</Typography>
                            </TableCell>
                            <TableCell sx={{ p: 1 }}>
                                <Typography variant="caption">{certification.certificate}</Typography>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Stack>
        <Divider orientation="vertical" flexItem sx={{ borderColor: '#000000', borderWidth: 1 }} />
        <Stack direction="column" spacing={1} sx={{ flexBasis: '50%' }}>
            <Typography variant="body1" sx={{ pt: 1 }}>
                <strong>Education</strong>
            </Typography>
            <Divider sx={{ borderBottomWidth: 2, borderColor: '#000000', marginTop: 1 }} />
            <Table size="small">
                <TableHead>
                    <TableRow>
                        {['School', 'Degree', 'Subject', 'From', 'To'].map((header) => (
                            <TableCell key={header} sx={{ p: 0 }}>
                                <Typography variant="caption">
                                    <strong>{header}</strong>
                                </Typography>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.histories.education.map((education, index) => (
                        <TableRow key={index}>
                            <TableCell sx={{ p: 0 }}>
                                <Typography variant="caption">{education.school}</Typography>
                            </TableCell>
                            <TableCell sx={{ p: 2 }}>
                                <Typography variant="caption">{education.degree}</Typography>
                            </TableCell>
                            <TableCell sx={{ p: 0 }}>
                                <Typography variant="caption">{education.subject}</Typography>
                            </TableCell>
                            <TableCell sx={{ p: 1 }}>
                                <Typography variant="caption">{education.from}</Typography>
                            </TableCell>
                            <TableCell sx={{ p: 1 }}>
                                <Typography variant="caption">{education.to}</Typography>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Stack>
    </Stack>
);


// template
const template = [
    {
        "employee": {
            "name": "John Doe",
            "position": "Software Engineer",
            "email": "johndoe@example.com",
            "phone": "+123456789",
            "image": "https://example.com/image.jpg",
            "biodata": {
                "profile": "Experienced software engineer with a passion for developing innovative programs.",
                "objective": "To leverage my skills in software development and contribute to impactful projects.",
                "placeOfBirth": "New York, USA",
                "dateOfBirth": "1990-05-15",
                "gender": "Male"
            }
        },
        "histories": {
            "employment": [
                {
                    "employer": "Tech Solutions Inc.",
                    "position": "Junior Software Developer",
                    "from": "2015",
                    "to": "2017"
                },
                {
                    "employer": "Innovatech LLC",
                    "position": "Software Engineer",
                    "from": "2017",
                    "to": "Present"
                }
            ],
            "certification": [
                {
                    "title": "Certified Java Developer",
                    "provider": "Oracle",
                    "date": "2016-08-01",
                    "duration": "6 months",
                    "certificate": "Yes"
                },
                {
                    "title": "AWS Certified Solutions Architect",
                    "provider": "Amazon",
                    "date": "2021-03-15",
                    "duration": "1 year",
                    "certificate": "Yes"
                }
            ],
            "education": [
                {
                    "school": "University of Technology",
                    "degree": "Bachelor of Science",
                    "subject": "Computer Science",
                    "from": "2011",
                    "to": "2015",
                    "GPA": "3.8"
                }
            ],
            "project": [
                {
                    "projectName": "E-commerce Platform",
                    "role": "Lead Developer",
                    "from": "2020-01-01",
                    "to": "2021-12-31",
                    "customer": "Retail Corp.",
                    "projectDescription": "Developed a full-featured e-commerce platform for online shopping.",
                    "technicalInformation": "Java, Spring Boot, React, MySQL",
                    "jobDescription": "Responsible for backend development and database management."
                },
                {
                    "projectName": "Mobile Banking App",
                    "role": "Backend Developer",
                    "from": "2022-01-01",
                    "to": "Present",
                    "customer": "Finance Inc.",
                    "projectDescription": "Creating a secure mobile banking application.",
                    "technicalInformation": "Node.js, Express, MongoDB",
                    "jobDescription": "Handling API development and integration with third-party services."
                }
            ]
        }
    }
]

// Main Page Component
export default function P79Template() {
    const [data, setData] = useState<DataType | null>(null);

    const handleDataReceived = (receivedData: DataType) => {
        setData(receivedData);
    };

    useEffect(() => {
        setData(template[0]);
    }, []);

    return (
        <Box sx={{ width: '100%' }}>
            {/* header */}
            <Header />

            {/* main components */}
            <Box component="table" sx={{ width: '100%' }}>
                <Box component="thead">
                    <Box component="tr">
                        <Box component="td">
                            <Box className="page-header-space" />
                        </Box>
                    </Box>
                </Box>
                <Box component="tbody">
                    <Box component="tr">
                        <Box
                            component="td"
                            sx={{
                                py: 2,
                                px: 9,
                            }}
                        >
                            {/* upload files */}
                            <Box sx={{ p: 2, width: '100%' }} className="no-print">
                                <UploadFile onDataReceived={handleDataReceived} />
                            </Box>

                            <Box sx={{ p: 1, my: 5, width: '100%', backgroundColor: '#E5E5E5' }} className="no-print">
                                <Typography variant="h6" >Result</Typography>
                            </Box>


                            {/* CV Output Area */}
                            {data && (
                                <Box sx={{ p: 2, width: '100%' }}>
                                    <Stack direction="column" spacing={3} alignItems="stretch">
                                        <PersonalInfoSection data={data} />

                                        <Stack direction="row" spacing={2} justifyContent="stretch">
                                            <EmploymentSection employment={data.histories.employment} />
                                            <Divider orientation="vertical" flexItem sx={{ borderColor: '#000000', borderWidth: 1 }} />
                                            <ObjectiveSection biodata={data.employee.biodata} />
                                        </Stack>

                                        {/* education and project section */}
                                        <EducationAndCertification data={data} />
                                        <ProjectSection projects={data.histories.project} />
                                    </Stack>
                                </Box>
                            )}
                        </Box>
                    </Box>
                </Box>

                <Box component="tfoot">
                    <Box component="tr">
                        <Box component="td">
                            <Box className="page-footer-space" />
                        </Box>
                    </Box>
                </Box>
            </Box>


            {/* footer */}
            <Footer />

            <Box className="no-print">
                <ListUpload />
                <Print />
            </Box>

        </Box>
    );
};


