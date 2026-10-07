import type { ReactNode } from "react";

const iconClass =
  "icon-face mb-2 h-7 w-7 shrink-0 object-contain sm:h-8 sm:w-8 md:h-10 md:w-10";

const brandIcons: Record<string, string> = {
  Python: "/icons/python.svg",
  Pandas: "/icons/pandas.svg",
  NumPy: "/icons/numpy.svg",
  MySQL: "/icons/mysql.svg",
  MongoDB: "/icons/mongodb.svg",
  "SQL Server": "/icons/sqlserver.svg",
  Cassandra: "/icons/cassandra.svg",
};

function Mark({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={iconClass}>
      {children}
    </svg>
  );
}

function Cylinder({ top, body, base }: { top: string; body: string; base: string }) {
  return (
    <Mark>
      <path d="M8 14c0-3.3 7.2-6 16-6s16 2.7 16 6v20c0 3.3-7.2 6-16 6s-16-2.7-16-6V14z" fill={body} />
      <ellipse cx="24" cy="34" rx="16" ry="6" fill={base} />
      <ellipse cx="24" cy="14" rx="16" ry="6" fill={top} />
      <ellipse cx="24" cy="14" rx="8" ry="2.6" fill="#ffffff" opacity="0.35" />
    </Mark>
  );
}

const glyphs: Record<string, ReactNode> = {
  SQL: (
    <Cylinder top="#38bdf8" body="#0284c7" base="#0369a1" />
  ),
  Bash: (
    <Mark>
      <rect x="8" y="10" width="32" height="28" rx="6" fill="#0f172a" stroke="#5eead4" strokeWidth="2" />
      <path d="M16 20l6 6-6 6M26 32h10" stroke="#67e8f9" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </Mark>
  ),
  "REST APIs": (
    <Mark>
      <circle cx="16" cy="24" r="7" fill="none" stroke="#67e8f9" strokeWidth="2.5" />
      <circle cx="32" cy="24" r="7" fill="none" stroke="#22d3ee" strokeWidth="2.5" />
      <path d="M23 24h4M16 17v14M32 17v14" stroke="#a5f3fc" strokeWidth="2" strokeLinecap="round" />
    </Mark>
  ),
  "Stored Procedures": (
    <Mark>
      <rect x="10" y="10" width="28" height="28" rx="6" fill="#1f2937" stroke="#34d399" strokeWidth="2" />
      <rect x="17" y="18" width="14" height="6" rx="2" fill="#34d399" />
      <rect x="17" y="26" width="14" height="6" rx="2" fill="#6ee7b7" />
      <path d="M21 14v-4M27 14v-4" stroke="#a7f3d0" strokeWidth="2" strokeLinecap="round" />
    </Mark>
  ),
  Python: (
    <Mark>
      <path d="M18 10c-7 0-9 4-9 9v6c0 7 4 9 9 9h3v-6h-3c-2 0-3-1-3-3v-5c0-2 1-3 3-3h6c2 0 3 1 3 3v3h5v-4c0-5-2-9-9-9h-5z" fill="#38bdf8" />
      <path d="M30 38c7 0 9-4 9-9v-6c0-7-4-9-9-9h-3v6h3c2 0 3 1 3 3v5c0 2-1 3-3 3h-6c-2 0-3-1-3-3v-3h-5v4c0 5 2 9 9 9h5z" fill="#2dd4bf" />
      <path d="M18 22h12" stroke="#e0f2fe" strokeWidth="2" strokeLinecap="round" />
    </Mark>
  ),
  "PySpark": (
    <Mark>
      <path d="M12 20l8-8 8 8-8 8-8-8z" fill="#fbbf24" />
      <path d="M24 28l8-8 8 8-8 8-8-8z" fill="#f59e0b" />
      <path d="M16 22h12M24 14v12" stroke="#fff7ed" strokeWidth="2" strokeLinecap="round" />
    </Mark>
  ),
  Scala: (
    <Mark>
      <path d="M10 14c8 0 16 4 28 4v8c-12 0-20-4-28-4v-8zm0 10c8 0 16 4 28 4v8c-12 0-20-4-28-4v-8zm0 10c8 0 16 4 28 4v8c-12 0-20-4-28-4v-8z" fill="#f97316" />
    </Mark>
  ),
  Pandas: (
    <Mark>
      <rect x="10" y="12" width="10" height="24" rx="2" fill="#22c55e" />
      <rect x="28" y="12" width="10" height="24" rx="2" fill="#10b981" />
      <path d="M18 16h10M18 24h10M18 32h10" stroke="#dcfce7" strokeWidth="2" strokeLinecap="round" />
    </Mark>
  ),
  "ETL/ELT": (
    <Mark>
      <rect x="8" y="18" width="10" height="12" rx="2" fill="#38bdf8" />
      <rect x="19" y="18" width="10" height="12" rx="2" fill="#22d3ee" />
      <rect x="30" y="18" width="10" height="12" rx="2" fill="#0891b2" />
      <path d="M18 24h1M29 24h1" stroke="#ecfeff" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 34h32M16 8l8 8 8-8" stroke="#67e8f9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Mark>
  ),
  "Data Pipelines": (
    <Mark>
      <rect x="8" y="21" width="8" height="8" rx="2" fill="#38bdf8" />
      <rect x="20" y="12" width="8" height="8" rx="2" fill="#22d3ee" />
      <rect x="32" y="21" width="8" height="8" rx="2" fill="#0891b2" />
      <path d="M16 25h4M28 16h4M16 25l8-8" stroke="#bae6fd" strokeWidth="2" strokeLinecap="round" />
    </Mark>
  ),
  "Incremental Loads": (
    <Mark>
      <rect x="10" y="24" width="8" height="12" rx="2" fill="#60a5fa" />
      <rect x="20" y="16" width="8" height="20" rx="2" fill="#3b82f6" />
      <rect x="30" y="10" width="8" height="26" rx="2" fill="#1d4ed8" />
      <path d="M9 14l4-4 4 4M33 14l4-4 4 4" stroke="#dbeafe" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Mark>
  ),
  CDC: (
    <Mark>
      <circle cx="24" cy="24" r="14" fill="none" stroke="#fbbf24" strokeWidth="2.6" />
      <path d="M24 10v14l9 5" fill="none" stroke="#fde68a" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </Mark>
  ),
  "Schema Evolution": (
    <Mark>
      <rect x="8" y="12" width="12" height="22" rx="2" fill="#60a5fa" />
      <rect x="22" y="10" width="18" height="12" rx="2" fill="#3b82f6" />
      <rect x="22" y="26" width="18" height="12" rx="2" fill="#1d4ed8" />
      <path d="M20 24h2M20 18h2" stroke="#dbeafe" strokeWidth="2" strokeLinecap="round" />
    </Mark>
  ),
  "Data Migration": (
    <Mark>
      <path d="M10 18h16l-4 6h16M10 30h16l-4-6h16" stroke="#c4b5fd" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="18" cy="18" r="3" fill="#8b5cf6" />
      <circle cx="30" cy="30" r="3" fill="#7c3aed" />
    </Mark>
  ),
  "Source-to-Target Mapping": (
    <Mark>
      <rect x="8" y="18" width="10" height="12" rx="2" fill="#34d399" />
      <rect x="30" y="18" width="10" height="12" rx="2" fill="#10b981" />
      <path d="M18 24h12M24 18v12" stroke="#a7f3d0" strokeWidth="2" strokeLinecap="round" />
    </Mark>
  ),
  Kafka: (
    <Mark>
      <path d="M12 20h20v8H12z" fill="#0f172a" stroke="#c084fc" strokeWidth="2" />
      <path d="M12 12h20v8H12zm0 16h20v8H12z" fill="#1e293b" stroke="#d8b4fe" strokeWidth="2" />
      <path d="M24 12v8M24 20v8" stroke="#e9d5ff" strokeWidth="2" strokeLinecap="round" />
    </Mark>
  ),
  "Apache Spark": (
    <Mark>
      <path d="M20 10l12 6v16l-12 6-12-6V16l12-6z" fill="#fbbf24" />
      <path d="M20 16l8 4v8l-8 4-8-4v-8l8-4z" fill="#f59e0b" />
      <path d="M20 8v32M8 20l12 6 12-6" stroke="#fff7ed" strokeWidth="2" strokeLinecap="round" />
    </Mark>
  ),
  Hadoop: (
    <Mark>
      <path d="M12 18h24l-4 12H16l-4-12z" fill="#f59e0b" />
      <path d="M18 18V12h12v6M16 30h16" stroke="#fde68a" strokeWidth="2" strokeLinecap="round" />
    </Mark>
  ),
  HDFS: (
    <Mark>
      <rect x="10" y="18" width="28" height="18" rx="3" fill="#1f2937" stroke="#22d3ee" strokeWidth="2" />
      <path d="M16 18v-6h16v6M18 24h12M18 30h12" stroke="#67e8f9" strokeWidth="2" strokeLinecap="round" />
    </Mark>
  ),
  Hive: (
    <Mark>
      <path d="M24 8l12 7v18l-12 7-12-7V15l12-7z" fill="#fbbf24" />
      <path d="M24 16l6 4v8l-6 4-6-4v-8l6-4z" fill="#ffe082" />
    </Mark>
  ),
  Partitioning: (
    <Mark>
      <rect x="8" y="14" width="10" height="20" rx="2" fill="#38bdf8" />
      <rect x="19" y="14" width="10" height="20" rx="2" fill="#22d3ee" />
      <rect x="30" y="14" width="10" height="20" rx="2" fill="#0891b2" />
      <path d="M11 24h4M22 24h4M33 24h4" stroke="#ecfeff" strokeWidth="2" strokeLinecap="round" />
    </Mark>
  ),
  "Parallel Processing": (
    <Mark>
      <rect x="8" y="18" width="8" height="12" rx="2" fill="#34d399" />
      <rect x="20" y="18" width="8" height="12" rx="2" fill="#10b981" />
      <rect x="32" y="18" width="8" height="12" rx="2" fill="#059669" />
      <path d="M12 30h28M16 12v6M24 12v6M32 12v6" stroke="#a7f3d0" strokeWidth="2" strokeLinecap="round" />
    </Mark>
  ),
  "Distributed Systems": (
    <Mark>
      <circle cx="15" cy="20" r="5" fill="#67e8f9" />
      <circle cx="33" cy="20" r="5" fill="#22d3ee" />
      <circle cx="24" cy="32" r="5" fill="#a5f3fc" />
      <path d="M19 22l4 7M29 22l-4 7M20 20h8" stroke="#ecfeff" strokeWidth="2" strokeLinecap="round" />
    </Mark>
  ),
  AWS: (
    <Mark>
      <path d="M14 30c0-6 4-10 10-10 3 0 5 1 7 4 2-2 5-3 8-3 7 0 10 6 10 10H14z" fill="#fbbf24" />
      <path d="M16 24h20M18 28h16M20 32h12" stroke="#fff7ed" strokeWidth="2" strokeLinecap="round" />
    </Mark>
  ),
  Azure: (
    <Mark>
      <path d="M8 32L22 10l10 18H8zm18 0l10-12 8 12h-18z" fill="#38bdf8" />
    </Mark>
  ),
  GCP: (
    <Mark>
      <path d="M24 8c8 0 14 6 14 14 0 8-6 14-14 14S10 30 10 22C10 14 16 8 24 8z" fill="#f97316" opacity="0.15" />
      <path d="M20 14h8l4 8-4 8h-8l-4-8 4-8z" fill="#f97316" />
      <path d="M24 17l-4 9h8l-4-9z" fill="#fff7ed" />
    </Mark>
  ),
  Snowflake: (
    <Mark>
      <path d="M24 8l10 6v20l-10 6-10-6V14l10-6zm0 6l-4 8h8l-4-8zm-6 12h12v4H18v-4zm8 8h-8v-4h8v4z" fill="#cfe8ff" />
    </Mark>
  ),
  Databricks: (
    <Mark>
      <path d="M14 16l10 6 10-6M14 24l10 6 10-6M14 32l10 6 10-6" fill="none" stroke="#6ee7b7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 12h20v28H14z" fill="#0f172a" opacity="0.2" />
    </Mark>
  ),
  BigQuery: (
    <Mark>
      <rect x="10" y="10" width="28" height="28" rx="6" fill="#14b8a6" />
      <path d="M18 18h12M18 24h12M18 30h8" stroke="#ecfeff" strokeWidth="2" strokeLinecap="round" />
    </Mark>
  ),
  Redshift: (
    <Mark>
      <path d="M12 18c0-4 5-8 12-8s12 4 12 8v16c0 4-5 8-12 8s-12-4-12-8V18z" fill="#f43f5e" opacity="0.9" />
      <ellipse cx="24" cy="18" rx="12" ry="4" fill="#fecdd3" />
    </Mark>
  ),
  "Synapse Analytics": (
    <Mark>
      <circle cx="18" cy="22" r="7" fill="#67e8f9" />
      <circle cx="30" cy="22" r="7" fill="#22d3ee" />
      <path d="M18 29l12-14" stroke="#ecfeff" strokeWidth="2" strokeLinecap="round" />
    </Mark>
  ),
  "Lakehouse Architecture": (
    <Mark>
      <path d="M8 20l16-8 16 8-16 8-16-8zm0 8l16 8 16-8" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 20v8M24 28v8M40 20v8" stroke="#bbf7d0" strokeWidth="2" strokeLinecap="round" />
    </Mark>
  ),
  "Data Marts": (
    <Mark>
      <rect x="10" y="16" width="8" height="18" rx="2" fill="#60a5fa" />
      <rect x="20" y="12" width="8" height="22" rx="2" fill="#3b82f6" />
      <rect x="30" y="18" width="8" height="16" rx="2" fill="#1d4ed8" />
    </Mark>
  ),
  OLAP: (
    <Mark>
      <path d="M24 8l14 8v16l-14 8-14-8V16l14-8zm0 8l8 4v8l-8 4-8-4v-8l8-4z" fill="#a78bfa" />
    </Mark>
  ),
  "Apache Airflow": (
    <Mark>
      <path d="M8 12h32v4H8zm8 8h16v4H16zm-8 8h32v4H8zm8 8h16v4H16z" fill="#7c3aed" />
      <circle cx="24" cy="20" r="4" fill="#d8b4fe" />
    </Mark>
  ),
  dbt: (
    <Mark>
      <path d="M12 30h24M16 18h16M20 12h8" stroke="#10b981" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M24 10v28" stroke="#6ee7b7" strokeWidth="2.4" strokeLinecap="round" />
    </Mark>
  ),
  Git: (
    <Mark>
      <circle cx="16" cy="16" r="5" fill="#f97316" />
      <circle cx="32" cy="16" r="5" fill="#f97316" />
      <circle cx="24" cy="32" r="5" fill="#f97316" />
      <path d="M20 18l4 10M28 18l-4 10M21 16h6" stroke="#fdba74" strokeWidth="2" strokeLinecap="round" />
    </Mark>
  ),
  "GitHub": (
    <Mark>
      <circle cx="24" cy="24" r="16" fill="#0f172a" stroke="#e2e8f0" strokeWidth="2" />
      <path d="M19 30c-4-1-6-4-6-8 0-5 4-8 10-8 6 0 10 3 10 8 0 4-2 7-6 8l-2 4h-4l-2-4z" fill="#e2e8f0" />
    </Mark>
  ),
  Jenkins: (
    <Mark>
      <rect x="9" y="16" width="30" height="16" rx="4" fill="#d97706" />
      <path d="M18 16V8h12v8M24 8v24" stroke="#fde68a" strokeWidth="2" strokeLinecap="round" />
    </Mark>
  ),
  "Azure DevOps": (
    <Mark>
      <path d="M10 30l8-6 8 4 12-14v18H10z" fill="#2563eb" />
      <path d="M18 22l6 8 14-14" stroke="#dbeafe" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Mark>
  ),
  Docker: (
    <Mark>
      <path d="M8 26h32v8H8zm5-10h5v6H13zm9 0h5v6h-5zm9 0h5v6h-5zm-18-8h5v6h-5zm9 0h5v6h-5zm9 0h5v6h-5z" fill="#38bdf8" />
      <path d="M8 34h32" stroke="#dbeafe" strokeWidth="2" strokeLinecap="round" />
    </Mark>
  ),
  Terraform: (
    <Mark>
      <path d="M16 8l8 4v12l-8-4V8zm8 4l8 4v12l-8-4V12zm-16 8l8 4v12l-8-4v-12z" fill="#7c3aed" />
    </Mark>
  ),
  "Schema Validation": (
    <Mark>
      <rect x="10" y="14" width="28" height="20" rx="4" fill="#0f172a" stroke="#34d399" strokeWidth="2" />
      <path d="M16 24h16M16 18h12M16 30h10" stroke="#a7f3d0" strokeWidth="2" strokeLinecap="round" />
      <path d="M30 18l3 3 6-8" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </Mark>
  ),
  "Data Lineage": (
    <Mark>
      <path d="M10 18h12v12H10zm16 0h12v12H26z" fill="#3b82f6" />
      <path d="M22 24h4" stroke="#dbeafe" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 20l-4 4 4 4M28 20l4 4-4 4" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Mark>
  ),
  "Metadata Management": (
    <Mark>
      <rect x="12" y="10" width="24" height="28" rx="4" fill="#f59e0b" />
      <rect x="18" y="16" width="12" height="4" rx="1" fill="#fff7ed" />
      <rect x="18" y="24" width="12" height="4" rx="1" fill="#fde68a" />
    </Mark>
  ),
  "Data Governance": (
    <Mark>
      <path d="M24 8l12 6v10c0 8-5 14-12 16-7-2-12-8-12-16V14l12-6z" fill="#10b981" />
      <path d="M18 24l4 4 8-10" fill="none" stroke="#ecfdf5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </Mark>
  ),
  "Data Catalog": (
    <Mark>
      <rect x="10" y="12" width="28" height="24" rx="4" fill="#60a5fa" />
      <path d="M16 18h16M16 24h16M16 30h10" stroke="#dbeafe" strokeWidth="2" strokeLinecap="round" />
    </Mark>
  ),
  "Data Observability": (
    <Mark>
      <circle cx="24" cy="24" r="14" fill="none" stroke="#22d3ee" strokeWidth="2.5" />
      <path d="M10 26c4-8 9-12 14-12s10 4 14 12" fill="none" stroke="#67e8f9" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="24" cy="24" r="3" fill="#a5f3fc" />
    </Mark>
  ),
  "Business Intelligence": (
    <Mark>
      <rect x="10" y="28" width="6" height="8" rx="1" fill="#34d399" />
      <rect x="20" y="20" width="6" height="16" rx="1" fill="#10b981" />
      <rect x="30" y="12" width="6" height="24" rx="1" fill="#059669" />
      <path d="M8 36h32" stroke="#a7f3d0" strokeWidth="2" strokeLinecap="round" />
    </Mark>
  ),
  Reporting: (
    <Mark>
      <rect x="12" y="10" width="24" height="28" rx="3" fill="#1f2937" stroke="#60a5fa" strokeWidth="2" />
      <path d="M18 18h12M18 24h12M18 30h8" stroke="#dbeafe" strokeWidth="2" strokeLinecap="round" />
    </Mark>
  ),
  "Data Analytics": (
    <Mark>
      <path d="M8 32l8-8 8 6 16-20" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 38h32" stroke="#a7f3d0" strokeWidth="2" strokeLinecap="round" />
    </Mark>
  ),
  "Data Visualization": (
    <Mark>
      <path d="M10 32h28" stroke="#7dd3fc" strokeWidth="2" strokeLinecap="round" />
      <path d="M14 32V18h6v14M22 32V12h6v20M30 32V22h6v10" fill="none" stroke="#38bdf8" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </Mark>
  ),
  "KPI Monitoring": (
    <Mark>
      <path d="M24 8a16 16 0 1 1 0 32 16 16 0 0 1 0-32z" fill="none" stroke="#fbbf24" strokeWidth="2.5" />
      <path d="M24 24l8-10" stroke="#facc15" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="24" cy="24" r="3" fill="#fff7ed" />
    </Mark>
  ),
  "Advanced SQL": (
    <Mark>
      <path d="M8 16c0-3.3 7.2-6 16-6s16 2.7 16 6v16c0 3.3-7.2 6-16 6s-16-2.7-16-6V16z" fill="#0369a1" />
      <ellipse cx="24" cy="32" rx="16" ry="6" fill="#075985" />
      <ellipse cx="24" cy="16" rx="16" ry="6" fill="#38bdf8" />
      <path d="M30 8l2.2 5.2L38 15l-5.8 1.8L30 22l-2.2-5.2L22 15l5.8-1.8L30 8z" fill="#fde68a" />
    </Mark>
  ),
  "Statistical Analysis": (
    <Mark>
      <path d="M6 36h36" stroke="#67e8f9" strokeWidth="2" />
      <path d="M8 32c4-2 6-12 10-14s6 8 10 8 4-16 8-16 6 18 8 22" fill="none" stroke="#22d3ee" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="18" cy="18" r="2" fill="#f0fdfa" />
      <circle cx="28" cy="26" r="2" fill="#f0fdfa" />
    </Mark>
  ),
  "Trend Analysis": (
    <Mark>
      <path d="M8 34h32" stroke="#6ee7b7" strokeWidth="2" />
      <path d="M8 30l10-8 8 4 14-16" fill="none" stroke="#10b981" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M32 10h8v8" fill="none" stroke="#34d399" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </Mark>
  ),
  "Variance Analysis": (
    <Mark>
      <rect x="8" y="22" width="6" height="16" rx="1.5" fill="#c4b5fd" />
      <rect x="18" y="10" width="6" height="28" rx="1.5" fill="#a78bfa" />
      <rect x="28" y="18" width="6" height="20" rx="1.5" fill="#8b5cf6" />
      <path d="M8 16h26" stroke="#ddd6fe" strokeWidth="1.6" strokeDasharray="2 2" />
    </Mark>
  ),
  "Root-Cause Analysis": (
    <Mark>
      <circle cx="22" cy="22" r="10" fill="none" stroke="#fbbf24" strokeWidth="3" />
      <path d="M29 29l9 9" stroke="#f59e0b" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="22" cy="22" r="3" fill="#fde68a" />
    </Mark>
  ),
  "Power BI": (
    <Mark>
      <rect x="4" y="4" width="40" height="40" rx="8" fill="#1a1a1a" />
      <rect x="10" y="26" width="6" height="12" rx="1" fill="#F2C811" />
      <rect x="21" y="16" width="6" height="22" rx="1" fill="#F2C811" />
      <rect x="32" y="10" width="6" height="28" rx="1" fill="#F2C811" />
    </Mark>
  ),
  Tableau: (
    <Mark>
      <circle cx="24" cy="24" r="18" fill="#E97627" />
      <circle cx="24" cy="24" r="7" fill="#1b1b1b" />
      <path d="M24 6v8M24 34v8M6 24h8M34 24h8" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
    </Mark>
  ),
  SSRS: (
    <Mark>
      <rect x="10" y="6" width="24" height="32" rx="3" fill="#0078D4" />
      <rect x="14" y="12" width="16" height="2" rx="1" fill="#fff" />
      <rect x="14" y="18" width="10" height="2" rx="1" fill="#bae6fd" />
      <rect x="14" y="26" width="4" height="8" rx="1" fill="#7dd3fc" />
      <rect x="20" y="22" width="4" height="12" rx="1" fill="#fff" />
      <rect x="26" y="28" width="4" height="6" rx="1" fill="#bae6fd" />
    </Mark>
  ),
  Excel: (
    <Mark>
      <rect x="4" y="4" width="40" height="40" rx="6" fill="#217346" />
      <path d="M16 14h20M16 22h20M16 30h20M16 14v20M26 14v20M36 14v20" stroke="#fff" strokeWidth="1.4" />
      <rect x="6" y="6" width="10" height="36" fill="#185C37" />
      <path d="M8 18l6 6-6 6" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </Mark>
  ),
  "Dashboard Development": (
    <Mark>
      <rect x="6" y="8" width="16" height="12" rx="2" fill="#38bdf8" />
      <rect x="26" y="8" width="16" height="12" rx="2" fill="#818cf8" />
      <rect x="6" y="24" width="36" height="16" rx="2" fill="#10b981" />
      <path d="M10 34l6-6 5 3 8-8" fill="none" stroke="#ecfdf5" strokeWidth="1.6" strokeLinecap="round" />
    </Mark>
  ),
  "KPI Reporting": (
    <Mark>
      <path d="M8 32a16 16 0 1 1 32 0" fill="none" stroke="#34d399" strokeWidth="4" strokeLinecap="round" />
      <path d="M24 32l8-10" stroke="#fde68a" strokeWidth="3" strokeLinecap="round" />
      <circle cx="24" cy="32" r="2.5" fill="#fff" />
    </Mark>
  ),
  "Executive Reporting": (
    <Mark>
      <rect x="8" y="10" width="32" height="26" rx="3" fill="#1e293b" stroke="#e2e8f0" strokeWidth="2" />
      <path d="M14 28l6-7 5 4 9-10" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" />
      <rect x="18" y="36" width="12" height="4" rx="1" fill="#94a3b8" />
    </Mark>
  ),
  "Ad Hoc Analysis": (
    <Mark>
      <path d="M26 6l-4 14h10L18 42l6-14H14L26 6z" fill="#fbbf24" />
    </Mark>
  ),
  "Self-Service BI": (
    <Mark>
      <circle cx="18" cy="16" r="6" fill="#67e8f9" />
      <path d="M8 36c1.2-7 5-10 10-10s8.8 3 10 10" fill="#22d3ee" />
      <rect x="28" y="18" width="4" height="16" rx="1" fill="#a7f3d0" />
      <rect x="34" y="12" width="4" height="22" rx="1" fill="#34d399" />
    </Mark>
  ),
  "Amazon Redshift": (
    <Mark>
      <rect x="6" y="6" width="36" height="36" rx="8" fill="#232F3E" />
      <path d="M14 32V18l10 8 10-8v14" fill="none" stroke="#8C4FFF" strokeWidth="3" strokeLinejoin="round" />
      <path d="M14 18l10-6 10 6" fill="none" stroke="#C4B5FD" strokeWidth="3" strokeLinejoin="round" />
    </Mark>
  ),
  Oracle: (
    <Mark>
      <circle cx="24" cy="24" r="16" fill="none" stroke="#C74634" strokeWidth="7" />
    </Mark>
  ),
  "Data Warehousing": (
    <Mark>
      <ellipse cx="24" cy="12" rx="14" ry="5" fill="#93c5fd" />
      <path d="M10 12v8c0 2.8 6.3 5 14 5s14-2.2 14-5v-8" fill="#3b82f6" />
      <path d="M10 20v8c0 2.8 6.3 5 14 5s14-2.2 14-5v-8" fill="#2563eb" />
      <path d="M10 28v6c0 2.8 6.3 5 14 5s14-2.2 14-5v-6" fill="#1d4ed8" />
    </Mark>
  ),
  "Dimensional Modeling": (
    <Mark>
      <path d="M24 6l16 8v16l-16 8-16-8V14l16-8z" fill="#6366f1" />
      <path d="M24 22l16-8M24 22L8 14M24 22v16" stroke="#e0e7ff" strokeWidth="1.6" />
    </Mark>
  ),
  "Star Schema": (
    <Mark>
      <circle cx="24" cy="24" r="5" fill="#fbbf24" />
      <circle cx="24" cy="8" r="3.2" fill="#fde68a" />
      <circle cx="24" cy="40" r="3.2" fill="#fde68a" />
      <circle cx="8" cy="24" r="3.2" fill="#fde68a" />
      <circle cx="40" cy="24" r="3.2" fill="#fde68a" />
      <path d="M24 19V11M24 29v8M19 24H11M29 24h8" stroke="#fbbf24" strokeWidth="1.6" />
    </Mark>
  ),
  "Snowflake Schema": (
    <Mark>
      <path d="M24 6v36M10 14l28 20M38 14L10 34" stroke="#7dd3fc" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M24 6l-4 6h8L24 6zM24 42l-4-6h8l-4 6zM10 14l7 1-2 6-5-7zM38 14l-7 1 2 6 5-7zM10 34l5-7 2 6-7 1zM38 34l-5-7-2 6 7 1z" fill="#e0f2fe" />
    </Mark>
  ),
  "Fact & Dimension Modeling": (
    <Mark>
      <rect x="6" y="10" width="16" height="12" rx="2" fill="#818cf8" />
      <rect x="26" y="10" width="16" height="12" rx="2" fill="#a5b4fc" />
      <rect x="12" y="28" width="24" height="12" rx="2" fill="#4f46e5" />
      <path d="M14 22v6M34 22v6" stroke="#c7d2fe" strokeWidth="1.6" />
    </Mark>
  ),
  "Analytical Data Models": (
    <Mark>
      <circle cx="14" cy="16" r="4" fill="#34d399" />
      <circle cx="34" cy="14" r="4" fill="#6ee7b7" />
      <circle cx="24" cy="32" r="5" fill="#10b981" />
      <path d="M17 19l5 9M31 17l-4 11M18 16h12" stroke="#a7f3d0" strokeWidth="1.6" />
    </Mark>
  ),
  "Semantic Reporting Structures": (
    <Mark>
      <path d="M8 34h32l-4-8H12l-4 8z" fill="#8b5cf6" />
      <path d="M12 26h24l-4-8H16l-4 8z" fill="#a78bfa" />
      <path d="M16 18h16l-8-8-8 8z" fill="#c4b5fd" />
    </Mark>
  ),
  SSIS: (
    <Mark>
      <rect x="6" y="8" width="12" height="10" rx="2" fill="#7c3aed" />
      <rect x="30" y="8" width="12" height="10" rx="2" fill="#8b5cf6" />
      <rect x="18" y="30" width="12" height="10" rx="2" fill="#c4b5fd" />
      <path d="M18 13h12M36 18v6H24v6" fill="none" stroke="#ddd6fe" strokeWidth="2" />
    </Mark>
  ),
  Informatica: (
    <Mark>
      <path d="M24 4l16 9v18L24 44 8 31V13L24 4z" fill="#FF4D00" />
      <path d="M24 14l8 4.5v9L24 32l-8-4.5v-9L24 14z" fill="#1a1a1a" />
    </Mark>
  ),
  "ETL Pipelines": (
    <Mark>
      <rect x="4" y="16" width="10" height="16" rx="2" fill="#22d3ee" />
      <rect x="19" y="16" width="10" height="16" rx="2" fill="#06b6d4" />
      <rect x="34" y="16" width="10" height="16" rx="2" fill="#0891b2" />
      <path d="M14 24h5M29 24h5" stroke="#ecfeff" strokeWidth="2" />
    </Mark>
  ),
  "SQL Pipelines": (
    <Mark>
      <ellipse cx="14" cy="24" rx="8" ry="4" fill="#38bdf8" />
      <path d="M6 24v8c0 2.2 3.6 4 8 4s8-1.8 8-4v-8" fill="#0284c7" />
      <path d="M26 24h12M32 18l6 6-6 6" fill="none" stroke="#67e8f9" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </Mark>
  ),
  "Data Transformation": (
    <Mark>
      <path d="M8 16h14l-4-5M22 16H8" fill="none" stroke="#f472b6" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M40 32H26l4 5M26 32h14" fill="none" stroke="#fb7185" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="18" y="20" width="12" height="8" rx="2" fill="#fda4af" />
    </Mark>
  ),
  "Data Integration": (
    <Mark>
      <circle cx="16" cy="24" r="8" fill="#4ade80" opacity="0.9" />
      <circle cx="32" cy="24" r="8" fill="#22c55e" opacity="0.9" />
      <path d="M22 24h4" stroke="#ecfdf5" strokeWidth="2" />
    </Mark>
  ),
  "Reporting Automation": (
    <Mark>
      <circle cx="24" cy="24" r="8" fill="none" stroke="#facc15" strokeWidth="3" />
      <circle cx="24" cy="24" r="3" fill="#fde68a" />
      <path d="M24 8v6M24 34v6M8 24h6M34 24h6M12 12l4 4M32 32l4 4M36 12l-4 4M16 32l-4 4" stroke="#facc15" strokeWidth="2" strokeLinecap="round" />
    </Mark>
  ),
  "Data Validation": (
    <Mark>
      <circle cx="24" cy="24" r="16" fill="#14532d" />
      <path d="M15 25l6 6 12-14" fill="none" stroke="#4ade80" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    </Mark>
  ),
  "Data Reconciliation": (
    <Mark>
      <path d="M24 10v6" stroke="#fbbf24" strokeWidth="2.4" />
      <path d="M10 22h28" stroke="#fde68a" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M24 16l-14 6 4 14h8" fill="#f59e0b" />
      <path d="M24 16l14 6-4 14h-8" fill="#fbbf24" />
    </Mark>
  ),
  "Data Quality Checks": (
    <Mark>
      <path d="M24 6l14 6v12c0 8-6 14-14 18-8-4-14-10-14-18V12l14-6z" fill="#059669" />
      <path d="M16 24l5 5 11-12" fill="none" stroke="#ecfdf5" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </Mark>
  ),
  "Data Accuracy": (
    <Mark>
      <circle cx="24" cy="24" r="14" fill="none" stroke="#fb7185" strokeWidth="2.4" />
      <circle cx="24" cy="24" r="8" fill="none" stroke="#fda4af" strokeWidth="2" />
      <circle cx="24" cy="24" r="3" fill="#fff1f2" />
      <path d="M24 4v6M24 38v6M4 24h6M38 24h6" stroke="#fb7185" strokeWidth="2" strokeLinecap="round" />
    </Mark>
  ),
  "Reporting Standardization": (
    <Mark>
      <rect x="8" y="10" width="32" height="6" rx="1.5" fill="#93c5fd" />
      <rect x="8" y="21" width="32" height="6" rx="1.5" fill="#60a5fa" />
      <rect x="8" y="32" width="32" height="6" rx="1.5" fill="#3b82f6" />
    </Mark>
  ),
  "Audit Reporting": (
    <Mark>
      <rect x="12" y="6" width="24" height="32" rx="3" fill="#fcd34d" />
      <rect x="18" y="4" width="12" height="6" rx="1.5" fill="#d97706" />
      <path d="M18 18h12M18 24h12M18 30h8" stroke="#78350f" strokeWidth="1.8" strokeLinecap="round" />
    </Mark>
  ),
  "Query Optimization": (
    <Mark>
      <path d="M10 32c6-2 8-10 12-12 4 6 8 4 12-8" fill="none" stroke="#a3e635" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M30 8l6 2-4 8" fill="#bef264" />
      <circle cx="16" cy="34" r="3" fill="#84cc16" />
    </Mark>
  ),
  "Dashboard Performance Optimization": (
    <Mark>
      <rect x="6" y="8" width="36" height="24" rx="3" fill="#0f172a" stroke="#22d3ee" strokeWidth="2" />
      <path d="M12 26l6-8 6 4 8-10" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 36h8" stroke="#67e8f9" strokeWidth="2" strokeLinecap="round" />
    </Mark>
  ),
  "Reporting Workflow Automation": (
    <Mark>
      <circle cx="12" cy="14" r="4" fill="#c084fc" />
      <circle cx="36" cy="14" r="4" fill="#e9d5ff" />
      <circle cx="24" cy="34" r="4" fill="#a855f7" />
      <path d="M16 16h16M14 18l8 12M34 18l-8 12" stroke="#d8b4fe" strokeWidth="1.8" />
    </Mark>
  ),
  "Metrics Development": (
    <Mark>
      <rect x="10" y="28" width="6" height="10" rx="1" fill="#fbbf24" />
      <rect x="21" y="18" width="6" height="20" rx="1" fill="#f59e0b" />
      <rect x="32" y="10" width="6" height="28" rx="1" fill="#d97706" />
      <path d="M8 24h32" stroke="#fde68a" strokeWidth="1.4" strokeDasharray="2 2" />
    </Mark>
  ),
  "Data Mining": (
    <Mark>
      <path d="M14 40l8-22 6 8 8-18" fill="none" stroke="#fb923c" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M30 8l6 2-2 8" fill="#fdba74" />
      <circle cx="14" cy="40" r="2.4" fill="#f97316" />
    </Mark>
  ),
  "Claims Analytics": (
    <Mark>
      <rect x="10" y="6" width="22" height="30" rx="3" fill="#0f766e" />
      <path d="M16 14h10M16 20h10M16 26h6" stroke="#99f6e4" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="34" cy="32" r="8" fill="#14b8a6" />
      <path d="M31 32l2 2 4-4" fill="none" stroke="#ecfdf5" strokeWidth="1.6" strokeLinecap="round" />
    </Mark>
  ),
  "Provider Analytics": (
    <Mark>
      <rect x="18" y="8" width="12" height="32" rx="3" fill="#2dd4bf" />
      <rect x="8" y="18" width="32" height="12" rx="3" fill="#14b8a6" />
    </Mark>
  ),
  "Payment Analytics": (
    <Mark>
      <rect x="6" y="12" width="36" height="24" rx="4" fill="#166534" />
      <rect x="6" y="18" width="36" height="6" fill="#4ade80" />
      <rect x="10" y="28" width="12" height="3" rx="1" fill="#bbf7d0" />
    </Mark>
  ),
  "Healthcare Operations Analytics": (
    <Mark>
      <path d="M6 26h8l4-10 6 18 4-8h14" fill="none" stroke="#34d399" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </Mark>
  ),
  "Business Performance Analysis": (
    <Mark>
      <rect x="8" y="26" width="6" height="12" rx="1" fill="#86efac" />
      <rect x="18" y="18" width="6" height="20" rx="1" fill="#4ade80" />
      <rect x="28" y="12" width="6" height="26" rx="1" fill="#22c55e" />
      <path d="M8 16l10-4 8 2 12-8" fill="none" stroke="#ecfdf5" strokeWidth="1.8" strokeLinecap="round" />
    </Mark>
  ),
  Forecasting: (
    <Mark>
      <path d="M6 32c6-2 8-8 14-8s6 6 10 4 8-12 12-14" fill="none" stroke="#67e8f9" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M30 10h10v8" fill="none" stroke="#a5f3fc" strokeWidth="2" strokeDasharray="2 2" />
      <circle cx="14" cy="28" r="2" fill="#cffafe" />
      <circle cx="26" cy="26" r="2" fill="#cffafe" />
    </Mark>
  ),
  Agile: (
    <Mark>
      <path d="M24 8a14 14 0 1 1-10 4" fill="none" stroke="#a78bfa" strokeWidth="3" strokeLinecap="round" />
      <path d="M12 10l2 8 8-2" fill="none" stroke="#c4b5fd" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </Mark>
  ),
  "Requirements Gathering": (
    <Mark>
      <rect x="10" y="6" width="28" height="36" rx="3" fill="#1e293b" stroke="#fde68a" strokeWidth="2" />
      <path d="M16 16h16M16 24h16M16 32h10" stroke="#fde68a" strokeWidth="2" strokeLinecap="round" />
    </Mark>
  ),
  "Stakeholder Management": (
    <Mark>
      <circle cx="16" cy="16" r="5" fill="#93c5fd" />
      <circle cx="32" cy="16" r="5" fill="#bfdbfe" />
      <path d="M8 34c1-6 4-8 8-8s7 2 8 8" fill="#60a5fa" />
      <path d="M24 34c1-6 4-8 8-8s7 2 8 8" fill="#3b82f6" />
    </Mark>
  ),
  "Cross-Functional Collaboration": (
    <Mark>
      <circle cx="24" cy="24" r="5" fill="#5eead4" />
      <circle cx="10" cy="12" r="3.5" fill="#99f6e4" />
      <circle cx="38" cy="12" r="3.5" fill="#2dd4bf" />
      <circle cx="10" cy="36" r="3.5" fill="#14b8a6" />
      <circle cx="38" cy="36" r="3.5" fill="#ccfbf1" />
      <path d="M21 21L13 15M27 21l8-6M21 27l-8 6M27 27l8 6" stroke="#5eead4" strokeWidth="1.6" />
    </Mark>
  ),
};

export default function SkillIcon({ name }: { name: string }) {
  const src = brandIcons[name];
  if (src) {
    return <img src={src} alt="" draggable={false} className={iconClass} />;
  }

  return glyphs[name] ?? (
    <Mark>
      <rect x="10" y="10" width="28" height="28" rx="6" fill="#10b981" />
    </Mark>
  );
}
