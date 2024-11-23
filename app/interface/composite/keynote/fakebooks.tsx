import * as React from "react";
import { logos } from '#app/routes/_marketing+/logos/logos'

const invoices = [
  {
    name: "Santa Monica",
    number: 1995,
    amount: "$10,800",
    due: -1,
  },
  {
    name: "Stankonia",
    number: 2000,
    amount: "$8,000",
    due: 0,
    active: true,
  },
  {
    name: "Ocean Avenue",
    number: 2003,
    amount: "$9,500",
    due: false,
  },
  {
    name: "Tubthumper",
    number: 1997,
    amount: "$14,000",
    due: 10,
  },
  {
    name: "Wide Open Sp...",
    number: 1998,
    amount: "$4,600",
    due: 8,
  },
];

export function RootView({
  children,
  overlay,
  className,
}: {
  children: React.ReactNode;
  overlay?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={
        "relative flex overflow-hidden backdrop-blur-xl bg-transparent" +
        " " +
        className
      }
    >
      <div className="bg-background/75 backdrop-blur-2xl border-r border-0.5 border-border">
        <div className="p-[5.7px] lg:p-4">
          <div className="h-2 md:h-7" />
          <div className="font-medium text-inherit">
            <NavItem>Front End</NavItem>
            <NavItem>Back End</NavItem>
            <NavItem> Analytics & AI </NavItem>
            <NavItem>Infrastructure</NavItem>
            <NavItem>System Design</NavItem>
          </div>
        </div>
      </div>
      <div className="flex-1 bg-transparent">{children}</div>
      {overlay}
    </div>
  );
}

export function DashboardView({
  highlightOnHover,
}: {
  highlightOnHover?: boolean;
}) {
  return (
    <div className="relative p-3 md:p-6">
      <div className="text-[length:10px] font-extrabold text-inherit md:text-3xl">
        Dashboard
      </div>
      <div className="h-2 md:h-6" />
      <div className="flex gap-2 border-b border-border pb-1 text-[length:5px] font-medium text-inherit md:gap-4 md:pb-4 md:text-[length:14px]">
        <div className="font-bold text-inherit">Recent Activity</div>
        <div>Alerts</div>
        <div>Messages</div>
      </div>
      <div className="h-3 md:h-4" />
      <div className="flex gap-2">
        <NewInvoiceCard
          name={invoices[1]?.name ?? ''}
          amount={invoices[1]?.amount ?? ''}
          hovered={highlightOnHover}
        />
        <NewInvoiceCard 
          name={invoices[2]?.name ?? ''} 
          amount={invoices[2]?.amount ?? ''} 
        />
      </div>
    </div>
  );
}

export function SalesView({
  children,
  overlay,
  shimmerNav,
  noActiveChild,
}: {
  children?: React.ReactNode;
  overlay?: React.ReactNode;
  shimmerNav?: boolean;
  noActiveChild?: boolean;
}) {
  return (
    <div className="relative h-full p-3 md:p-10 bg-background/75">
      <div className="text-[length:10px] font-extrabold text-inherit md:text-3xl">
        Front End
      </div>
      <div className="h-2 md:h-6" />
      {shimmerNav && <div className="h-4" />}
      <div className="flex gap-2 border-b border-border pb-1 text-[length:5px] font-medium text-inherit md:gap-4 md:pb-4 md:text-[length:14px]">
        {shimmerNav ? (
          <>
            <div className="w-1/3 animate-pulse rounded bg-background">
              &nbsp;
            </div>
            <div className="w-1/3 animate-pulse rounded bg-background">
              &nbsp;
            </div>
            <div className="w-1/3 animate-pulse rounded bg-background">
              &nbsp;
            </div>
          </>
        ) : (
          <>

            <div className={noActiveChild ? "" : "font-medium text-inherit"}>
              Skills
            </div>
            <div className={noActiveChild ? "" : "font-medium text-muted"}>
              Experience
            </div>
            <div className={noActiveChild ? "" : "font-medium text-muted"}>
              Projects
            </div>
          </>
        )}
      </div>
      <div className="h-3 md:h-4" />
      {children}
      {overlay}
    </div>
  );
}

export function InvoicesView({
  children,
  overlay,
}: {
  children?: React.ReactNode;
  overlay?: React.ReactNode;
}) {
  // Filter front-end related logos
  const frontEndLogos = [
    'typescript',
    'remix',
    'tailwind',
    'radix',
    'shadcn-ui',
    'react-email',
    'prettier',
    'eslint'
  ].map(name => 
    logos.find(logo => logo.alt.toLowerCase().includes(name.toLowerCase()))
  ).filter(Boolean);

  return (
    <div className="relative">
      <div className="flex items-center justify-between gap-1 md:gap-4">
        <div className="flex h-[6px] flex-1 overflow-hidden rounded-full md:h-4">
          <div className="w-1/3 bg-yellow-brand" />
          <div className="flex-1 bg-green-brand" />
        </div>
      </div>
      <div className="h-3 md:h-4" />
      <div className="h-[2.8px] md:h-2" />
      <div className="flex p-4">
        <div className="flex gap-6 items-center justify-around w-full">
          {frontEndLogos.map((logo, index) => (
            logo && (
              <div key={index} className="flex flex-col items-center gap-2">
                <img 
                  src={logo.src} 
                  alt={logo.alt} 
                  className="w-12 h-12 md:w-16 md:h-16"
                />
                <span className="text-xs md:text-sm font-medium">{logo.alt}</span>
              </div>
            )
          ))}
        </div>
      </div>
      {overlay}
    </div>
  );
}

export function InvoiceView({
  overlay,
  error,
  children,
}: {
  error?: boolean;
  children?: React.ReactNode;
  overlay?: React.ReactNode;
}) {
  let invoice = invoices[1];
  return (
    <div className="relative p-3 md:p-10">
      <div className="text-[length:5px] font-bold leading-[8.5px] md:text-[length:14px] md:leading-6">
        {invoice?.name ?? ''}
      </div>
      <div className="text-[length:11px] font-bold leading-[14px] md:text-[length:32px] md:leading-[40px]">
        {invoice?.amount ?? ''}
      </div>
      <LabelText>{getInvoiceDue(invoice ?? invoices[0])} • Invoiced 10/31/2000</LabelText>
      <div className="h-[5.7px] md:h-4" />
      <LineItem label="Pro Plan" amount="$6,000" />
      <LineItem label="Custom" amount="$2,000" />
      <LineItem bold label="Net Total" amount="$8,000" />
      {overlay}
      {error && (
        <div className="absolute inset-0 flex justify-center bg-background pt-4">
          <div className="text-center text-red-700">
            <div className="text-[10px] font-bold md:text-[14px]">Oh snap!</div>
            <div className="px-2 text-[8px] md:text-[12px]">
              There was a problem loading this invoice
            </div>
          </div>
        </div>
      )}
      {children}
    </div>
  );
}

////////////////////////////////////////////////////////////////////////////////

function InvoicesInfo({
  label,
  amount,
  right,
}: {
  label: string;
  amount: string;
  right?: boolean;
}) {
  return (
    <div className={right ? "text-right" : ""}>
      <LabelText>{label}</LabelText>
      <div className="text-[length:6.4px] text-inherit md:text-[length:18px]">
        {amount}
      </div>
    </div>
  );
}

function InvoiceList({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex rounded border border-border">
      <div className="w-1/2 border-r border-border">
        {invoices.map((invoice, index) => (
          <div
            key={index}
            className={
              "border-b border-border py-[4.2px] md:py-3" +
              " " +
              (index === 1
                ? "bg-transparent px-[5.7px] md:px-4"
                : "mx-[5.7px] border-transparent md:mx-4")
            }
          >
            <div className="flex justify-between text-[length:5px] font-bold leading-[8.5px] md:text-[length:14px] md:leading-6">
              <div>{invoice.name}</div>
              <div>{invoice.amount}</div>
            </div>
            <div className="flex justify-between text-[length:4.2px] font-medium leading-[6px] text-gray-500 md:text-[length:12px] md:leading-4">
              <div>{invoice.number}</div>
              <div
                className={
                  "uppercase" +
                  " " +
                  (invoice.due === false
                    ? "text-green-700"
                    : Number(invoice.due) < 0
                      ? "text-red-600"
                      : "")
                }
              >
                {getInvoiceDue(invoice)}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="w-1/2">{children}</div>
    </div>
  );
}

function FakebooksLogo({ className }: { className: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M12 3a9 9 0 000 18h4.5c1.398 0 2.097 0 2.648-.228a3 3 0 001.624-1.624C21 18.597 21 17.898 21 16.5V12a9 9 0 00-9-9zm-4 8a1 1 0 011-1h6a1 1 0 110 2H9a1 1 0 01-1-1zm3 4a1 1 0 011-1h3a1 1 0 110 2h-3a1 1 0 01-1-1z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

function NavItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`my-[1.4px] px-[2.8px] py-[1.4px] pr-4 text-[length:7px] md:my-1 md:px-2 md:py-1 md:pr-16 md:text-[length:10px] lg:text-[length:14px] ${className}`}
    >
      {children}
    </div>
  );
}

function ActivityCard({
  title,
  children,
  hovered,
}: {
  title: string;
  children: React.ReactNode;
  hovered?: boolean;
}) {
  return (
    <div
      className={
        "box-border flex-1 rounded-lg border border-border p-2 md:p-10" +
        " " +
        (hovered ? "bg-background" : "")
      }
    >
      <div className="text-center text-[length:5px] font-bold leading-[8.5px] md:text-[length:14px] md:leading-6">
        {title}
      </div>
      <div className="h-[5.7px] md:h-4" />
      {children}
    </div>
  );
}

function NewInvoiceCard({
  name,
  amount,
  hovered,
}: {
  name: string;
  amount: string;
  hovered?: boolean;
}) {
  return (
    <ActivityCard hovered={hovered} title="New Invoice">
      <LineItem label="Customer" amount={name} />
      <LineItem label="Net Total" amount={amount} />
    </ActivityCard>
  );
}

function LabelText({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[length:5px] font-medium uppercase leading-[8.5px] text-inherit md:text-[12px] md:leading-[24px]">
      {children}
    </div>
  );
}

function LineItem({
  label,
  amount,
  bold,
}: {
  label: string;
  amount: string;
  bold?: boolean;
}) {
  return (
    <div
      className={
        "flex justify-between border-t border-border py-[5.7px] text-[5px] leading-[9px] md:py-4 md:text-[14px] md:leading-[24px]" +
        " " +
        (bold ? "font-bold" : "")
      }
    >
      <div>{label}</div>
      <div>{amount}</div>
    </div>
  );
}

function getInvoiceDue(invoice: (typeof invoices)[number] | undefined) {
  if (!invoice) return "Unknown";
  return invoice.due === false
    ? "Paid"
    : typeof invoice.due === 'number'
      ? invoice.due < 0
        ? "Overdue"
        : invoice.due === 0
          ? "Due Today"
          : `Due in ${invoice.due} Days`
      : "Unknown";
}
