export const profile = {
  firstName: "Venkatesh",
  lastName: "Bhukya",
  fullName: "Venkatesh Bhukya",
  given: "Venkatesh",
  title: "Data Engineer",
  shortTitle: "Data Engineer",
  location: "Cohoes, NY (Remote)",
  phone: "+1 (518) 308-8759",
  phoneHref: "tel:+15183088759",
  email: "venkatesh.bhukya@applywizard.ai",
  emailHref: "mailto:venkatesh.bhukya@applywizard.ai",
  years: "5+",
  descriptor: "Data Engineering · Cloud ETL · Analytics",
  heroRole: "Data Engineer",
  heroCopy:
    "Data Engineer with 5+ years of experience designing cloud data pipelines, ETL/ELT systems, and analytics platforms across banking, healthcare, and retail environments.",
};

export const aboutBlocks = [
  "Data Engineer with 5+ years of experience developing cloud data pipelines and platforms across banking, healthcare, and retail data environments, supporting ETL/ELT, Big Data processing, analytics, and business intelligence workloads.",
  "Builds batch and streaming data solutions using Python, SQL, PySpark, Apache Spark, Kafka, Airflow, and dbt, with hands-on experience across AWS, Azure, GCP, Snowflake, Databricks, BigQuery, Redshift, and Synapse Analytics.",
  "Strengthens data operations through dimensional modeling, incremental processing, query optimization, data quality, reconciliation, governance, and DataOps to reliably process 1M+ daily records for reporting and analytics.",
  "Connects engineering with business needs by collaborating with database, risk, healthcare, retail, compliance, and BI teams to deliver governed datasets for financial reporting, healthcare analytics, and operational decision-making.",
];

export const terminalLines = [
  { label: "initializing_identity", value: "[OK]" },
  { label: "loading_persona", value: "DATA_ENGINEER" },
  { label: "status", value: "ONLINE" },
  { label: "location", value: "COHOES_NY" },
  { label: "objective", value: "BUILD_GOVERNED_DATA_PIPELINES_" },
];

export const identityCards = [
  { label: "Status", value: "Online // Available for data roles" },
  { label: "Specialization", value: "Cloud ETL // Big Data // Data Platforms" },
];

export const focusPills = [
  "ETL/ELT",
  "PySpark",
  "Kafka",
  "Airflow",
  "dbt",
  "Data Quality",
];

export const stats = [
  { value: "05+", label: "Years experience" },
  { value: "1M+", label: "Daily records processed" },
  { value: "15+", label: "ETL workflows orchestrated" },
  { value: "98%", label: "Successful execution rate" },
  { value: "24%", label: "Batch time reduction" },
];

export type ExperienceItem = {
  id: string;
  company: string;
  role: string;
  dates: string;
  location: string;
  mark: string;
  points: string[];
};

export const experienceData: ExperienceItem[] = [
  {
    id: "truist",
    company: "Truist Bank",
    role: "Data Engineer",
    dates: "Mar 2025 – Present",
    location: "USA | Remote",
    mark: "TB",
    points: [
      "Engineered reusable ETL/ELT pipelines in Python and PySpark to consolidate transaction, customer, and account data into AWS, cutting downstream data preparation time by 28% for risk and reporting teams.",
      "Optimized SQL transformations and Redshift data models behind high-volume financial reporting, reducing average query runtime from 11 to 7 minutes while preserving reconciliation accuracy.",
      "Automated incremental ingestion for 10+ upstream banking feeds through AWS Glue and Airflow, replacing repetitive full loads and shortening the overnight processing window by 24%.",
      "Strengthened production reliability by adding validation, dependency, retry, and monitoring controls to critical data pipelines, improving successful scheduled executions from 94% to 98%.",
      "Streamlined Spark processing on EMR by revising partitioning and transformation logic for transaction datasets, lowering recurring compute consumption by approximately 18% without affecting delivery SLAs.",
      "Established source-to-target reconciliation and schema checks with Python and SQL for customer and account datasets, reducing recurring data-quality exceptions by 21% before warehouse consumption.",
      "Secured sensitive financial datasets through IAM-based access controls and encryption across S3 and warehouse layers, closing 100% of identified access-control gaps during internal data reviews.",
      "Partnered with risk, finance, analytics, and Business Intelligence teams to redesign frequently used Snowflake/Redshift datasets, reducing manual report preparation by roughly 6 hours per reporting cycle.",
    ],
  },
  {
    id: "molina",
    company: "Molina Healthcare",
    role: "Data Engineer",
    dates: "Mar 2024 – Feb 2025",
    location: "USA | Remote",
    mark: "MH",
    points: [
      "Developed Azure Data Factory pipelines that unified claims, member, provider, and eligibility feeds in ADLS Gen2, reducing data-delivery delays by 26% for healthcare analytics and reporting teams.",
      "Transformed approximately 1M+ daily healthcare records in Databricks with PySpark, standardizing inconsistent source fields and lowering downstream data-quality exceptions by 22%.",
      "Designed dimensional models in Synapse Analytics for claims and member reporting, simplifying complex SQL access patterns and improving commonly used analytical query performance by 27%.",
      "Orchestrated 15+ recurring ETL workflows through Azure Data Factory and Airflow, introducing dependency and recovery controls that increased on-time pipeline completion to 96%.",
      "Reduced processing overhead by replacing full dataset refreshes with incremental loading for high-volume eligibility and claims feeds, shortening recurring batch execution by 23%.",
      "Implemented reconciliation and schema-validation rules between source systems and curated datasets, decreasing claims-related data discrepancies by 14% before Business Intelligence consumption.",
      "Protected healthcare information with role-based access, encryption, and governed data-layer controls, maintaining 99% compliance with required pipeline access reviews for assigned datasets.",
      "Collaborated with claims operations, compliance, analytics, and Power BI teams to translate reporting requirements into curated datasets, cutting recurring manual data preparation by 5+ hours per reporting cycle.",
    ],
  },
  {
    id: "augur",
    company: "Augur Talentcare Pvt Ltd",
    role: "Data Engineer",
    dates: "Jan 2020 – Apr 2022",
    location: "India | Remote",
    mark: "AT",
    points: [
      "Built Python and SQL ETL pipelines that consolidated sales, product, inventory, and order data into BigQuery, reducing manual data preparation by 25% for retail analytics and reporting teams.",
      "Migrated approximately 700 GB of historical sales and product data from relational and file-based sources into GCP, validating source-to-target totals and improving access to historical retail datasets.",
      "Processed daily order and inventory datasets with PySpark and Dataflow, restructuring transformations and partitioning logic to reduce recurring batch-processing time by 20%.",
      "Scheduled 12+ dependent data workflows through Airflow and Cloud Composer, adding failure handling and restart controls that improved successful scheduled completion to 97%.",
      "Integrated event-driven sales and inventory feeds through Kafka and Pub/Sub, reducing data-availability delays by approximately 30% for operational analytics.",
      "Modeled sales, product, store, and inventory data using dimensional structures in BigQuery, improving frequently executed Business Intelligence query performance by 10%.",
      "Resolved source-to-target inconsistencies through SQL reconciliation and schema validation, lowering production data exceptions by 16% across critical retail datasets.",
      "Coordinated with data analysts, QA, Business Intelligence, and retail stakeholders to address mapping and ETL defects before release, reducing post-release data issues by 12%.",
    ],
  },
];

export type SkillGroup = {
  id: string;
  domain: string;
  items: string[];
};

export const skillsData: SkillGroup[] = [
  {
    id: "programming",
    domain: "Programming & Data Engineering",
    items: [
      "Python",
      "SQL",
      "PySpark",
      "Scala",
      "Pandas",
      "Bash",
      "REST APIs",
      "Stored Procedures",
    ],
  },
  {
    id: "integration",
    domain: "Data Engineering & Integration",
    items: [
      "ETL/ELT",
      "Data Pipelines",
      "Incremental Loads",
      "CDC",
      "Schema Evolution",
      "Data Migration",
      "Source-to-Target Mapping",
      "Kafka",
    ],
  },
  {
    id: "bigdata",
    domain: "Big Data & Distributed Processing",
    items: [
      "Apache Spark",
      "PySpark",
      "Hadoop",
      "HDFS",
      "Hive",
      "Partitioning",
      "Parallel Processing",
      "Distributed Systems",
    ],
  },
  {
    id: "cloud",
    domain: "Cloud & Data Platforms",
    items: [
      "AWS",
      "Azure",
      "GCP",
      "Snowflake",
      "Databricks",
      "BigQuery",
      "Redshift",
      "Synapse Analytics",
    ],
  },
  {
    id: "warehouse",
    domain: "Data Warehousing & Modeling",
    items: [
      "Data Warehousing",
      "Lakehouse Architecture",
      "Dimensional Modeling",
      "Star Schema",
      "Snowflake Schema",
      "Fact & Dimension Modeling",
      "Data Marts",
      "OLAP",
    ],
  },
  {
    id: "ops",
    domain: "Orchestration & DataOps",
    items: [
      "Apache Airflow",
      "dbt",
      "Git",
      "GitHub",
      "Jenkins",
      "Azure DevOps",
      "Docker",
      "Terraform",
    ],
  },
  {
    id: "quality",
    domain: "Data Quality & Governance",
    items: [
      "Data Validation",
      "Schema Validation",
      "Data Reconciliation",
      "Data Lineage",
      "Metadata Management",
      "Data Governance",
      "Data Catalog",
      "Data Observability",
    ],
  },
  {
    id: "analytics",
    domain: "Analytics & BI",
    items: [
      "Power BI",
      "Tableau",
      "Business Intelligence",
      "Dashboard Development",
      "Reporting",
      "Data Analytics",
      "Data Visualization",
      "KPI Monitoring",
    ],
  },
];

export type ProjectItem = {
  id: string;
  number: string;
  title: string;
  category: "Consulting" | "Healthcare";
  technologies: string[];
  summary: string;
  details: string[];
};

export const projectsData: ProjectItem[] = [
  {
    id: "banking-audit",
    number: "01",
    title: "Banking Data Audit & Exception Management",
    category: "Consulting",
    technologies: ["Python", "SQL", "PySpark", "AWS Glue", "Redshift"],
    summary:
      "Created an audit-trail process for banking datasets to capture source counts, load status, and reconciliation outcomes for financial reporting teams.",
    details: [
      "Devised an audit-trail process capturing source counts, load status, and reconciliation results for financial datasets, reducing manual audit preparation by 9% across scheduled reporting cycles.",
      "Created SQL-driven exception views that grouped unmatched transaction records by failure reason, helping operations teams resolve recurring data issues 19% faster without searching raw pipeline logs.",
      "Enabled historical reprocessing of corrected financial records through parameterized Python routines, recovering affected reporting data within 2 hours instead of requiring full dataset reloads.",
    ],
  },
  {
    id: "healthcare-reference",
    number: "02",
    title: "Healthcare Reference Data Standardization",
    category: "Healthcare",
    technologies: ["PySpark", "SQL", "Synapse", "Azure Data Factory"],
    summary:
      "Consolidated inconsistent provider and plan reference values into governed lookup structures to reduce downstream mapping exceptions across healthcare reporting datasets.",
    details: [
      "Consolidated inconsistent provider and plan reference values into governed lookup structures using PySpark and SQL, reducing downstream mapping exceptions by 17% across healthcare reporting datasets.",
      "Applied effective-date handling for changing member and provider reference attributes, improving historical reporting consistency across 4 analytical subject areas without overwriting prior values.",
      "Published reusable reference datasets through Synapse for analytics and BI consumers, eliminating approximately 15% of duplicate transformation logic maintained across downstream reporting workflows.",
    ],
  },
  {
    id: "retail-ingestion",
    number: "03",
    title: "Retail Data Configuration & Reusable Ingestion Framework",
    category: "Consulting",
    technologies: ["Python", "SQL", "Kafka", "Airflow", "BigQuery"],
    summary:
      "Formulated a configuration-driven ingestion framework for recurring retail source patterns to reduce source-specific code changes and support faster onboarding.",
    details: [
      "Formulated configuration-driven ingestion logic in Python to support 4 recurring retail source patterns, reducing source-specific code changes when new sales and inventory datasets were introduced.",
      "Normalized product, store, and order field definitions through reusable SQL mapping templates, decreasing transformation-related defects by 11% during QA and downstream reporting validation.",
      "Documented dataset dependencies, transformation rules, and operational handoffs for the retail ingestion framework, shortening troubleshooting time by approximately 13% during support activities.",
    ],
  },
];

export const projectFilters = ["All", "Consulting", "Healthcare"] as const;

export type EducationItem = {
  id: string;
  school: string;
  degree: string;
  dates: string;
  location: string;
  mark: string;
};

export const educationData: EducationItem[] = [
  {
    id: "eiu",
    school: "Eastern Illinois University",
    degree: "Master of Science in Computer Science",
    dates: "Dec 2023",
    location: "Charleston, IL",
    mark: "EIU",
  },
];

export type CertificationItem = {
  id: string;
  title: string;
  issuer: string;
  kind: "Certificate" | "Publication";
};

export const certificationsData: CertificationItem[] = [
  {
    id: "google",
    title: "Google Cloud Certified: Associate Cloud Engineer",
    issuer: "Google Cloud",
    kind: "Certificate",
  },
  {
    id: "aws",
    title: "AWS Certified Data Engineer - Associate",
    issuer: "AWS",
    kind: "Certificate",
  },
  {
    id: "azure",
    title: "Microsoft Certified: Azure Data Fundamentals (DP-900)",
    issuer: "Microsoft",
    kind: "Certificate",
  },
  {
    id: "ibm",
    title: "IBM Data Engineering Professional Certificate",
    issuer: "Coursera",
    kind: "Certificate",
  },
  {
    id: "gcp",
    title: "Data Engineering, Big Data, and Machine Learning on GCP Specialization",
    issuer: "Coursera",
    kind: "Certificate",
  },
  {
    id: "warehouse",
    title: "Data Warehousing for Business Intelligence Specialization",
    issuer: "Coursera",
    kind: "Certificate",
  },
];

export const publicationData = {
  id: "gcp-specialization",
  title: "Data Engineering, Big Data, and Machine Learning on GCP Specialization",
  kind: "Specialization",
  venue: "Coursera",
};

export const certFilters = ["All", "Certificates", "Specialization"] as const;

export const navItems = [
  { id: "home", href: "#home", label: "Home", hue: "#00F9FF" },
  { id: "about", href: "#about", label: "About", hue: "#10B981" },
  { id: "experience", href: "#experience", label: "Experience", hue: "#C084FC" },
  { id: "projects", href: "#work", label: "Projects", hue: "#FF0080" },
  { id: "skills", href: "#tech", label: "Skills", hue: "#38BDF8" },
  { id: "education", href: "#education", label: "Education", hue: "#F59E0B" },
  { id: "certifications", href: "#certificates", label: "Certificates", hue: "#34D399" },
  { id: "contact", href: "#contact", label: "Contact", hue: "#00F9FF" },
];

export const loaderPhases = [
  "INITIALIZING SYSTEM",
  "COMPILING HARMONICS",
  "RESONANCE DETECTED",
  "ENTERING DIMENSION",
];
