import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { HotelsModule } from "./hotels/hotels.module";
import { RolesModule } from "./roles/roles.module";
import { SettingsModule } from "./settings/settings.module";
import { AuditModule } from "./audit/audit.module";
import { RoomsModule } from "./rooms/rooms.module";
import { ReservationsModule } from "./reservations/reservations.module";
import { GuestsModule } from "./guests/guests.module";
import { HousekeepingModule } from "./housekeeping/housekeeping.module";
import { MaintenanceModule } from "./maintenance/maintenance.module";
import { InventoryModule } from "./inventory/inventory.module";
import { ProcurementModule } from "./procurement/procurement.module";
import { FinanceModule } from "./finance/finance.module";
import { ReportingModule } from "./reporting/reporting.module";
import { DashboardModule } from "./dashboard/dashboard.module";
import { CrmModule } from "./crm/crm.module";
import { MarketingModule } from "./marketing/marketing.module";
import { AutomationModule } from "./automation/automation.module";
import { HallsModule } from "./halls/halls.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    HotelsModule,
    RolesModule,
    SettingsModule,
    AuditModule,
    RoomsModule,
    ReservationsModule,
    GuestsModule,
    HousekeepingModule,
    MaintenanceModule,
    InventoryModule,
    ProcurementModule,
    FinanceModule,
    ReportingModule,
    DashboardModule,
    CrmModule,
    MarketingModule,
    AutomationModule,
    HallsModule
  ]
})
export class AppModule {}

