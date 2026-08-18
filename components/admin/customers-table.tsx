import { MOCK_CUSTOMERS } from '@/lib/admin/mock-customers'

const COLUMNS = ['Vardas', 'El. paštas', 'Paslauga', 'Įsigijimo data', 'Būsena']

export function CustomersTable() {
  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">
        Rodomi pavyzdiniai duomenys — dar nesusieta su realia užsakymų lentele.
      </p>

      <div className="sm:overflow-x-auto border border-border/60 rounded-xl">
        <div
          className="admin-row-grid grid gap-y-3 sm:gap-y-0 p-3 sm:p-0 sm:min-w-max"
          style={{ '--admin-grid-cols': `repeat(${COLUMNS.length}, minmax(140px, 1fr))` } as React.CSSProperties}
        >
          {COLUMNS.map((label) => (
            <div
              key={label}
              className="hidden sm:block px-3 py-2 text-xs font-semibold text-muted-foreground bg-secondary border-b border-border/60"
            >
              {label}
            </div>
          ))}

          {MOCK_CUSTOMERS.map((customer) => (
            <div
              key={customer.id}
              className="block sm:contents border border-border/60 rounded-xl p-3 space-y-2 sm:border-0 sm:rounded-none sm:p-0 sm:space-y-0"
            >
              <div className="sm:px-3 sm:py-2 sm:border-b sm:border-border/40 flex flex-col gap-1 sm:flex-row sm:items-center">
                <span className="sm:hidden text-xs font-medium text-muted-foreground">Vardas</span>
                <span className="text-sm text-foreground">{customer.name}</span>
              </div>
              <div className="sm:px-3 sm:py-2 sm:border-b sm:border-border/40 flex flex-col gap-1 sm:flex-row sm:items-center">
                <span className="sm:hidden text-xs font-medium text-muted-foreground">El. paštas</span>
                <span className="text-sm text-muted-foreground">{customer.email}</span>
              </div>
              <div className="sm:px-3 sm:py-2 sm:border-b sm:border-border/40 flex flex-col gap-1 sm:flex-row sm:items-center">
                <span className="sm:hidden text-xs font-medium text-muted-foreground">Paslauga</span>
                <span className="text-sm text-foreground">{customer.trainingType}</span>
              </div>
              <div className="sm:px-3 sm:py-2 sm:border-b sm:border-border/40 flex flex-col gap-1 sm:flex-row sm:items-center">
                <span className="sm:hidden text-xs font-medium text-muted-foreground">Įsigijimo data</span>
                <span className="text-sm text-muted-foreground">{customer.purchasedAt}</span>
              </div>
              <div className="sm:px-3 sm:py-2 sm:border-b sm:border-border/40 flex flex-col gap-1 sm:flex-row sm:items-center">
                <span className="sm:hidden text-xs font-medium text-muted-foreground">Būsena</span>
                <span
                  className={`inline-flex w-fit items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                    customer.status === 'aktyvus'
                      ? 'bg-primary/10 text-primary'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {customer.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
