"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_module_1 = require("./prisma/prisma.module");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const hotels_module_1 = require("./hotels/hotels.module");
const roles_module_1 = require("./roles/roles.module");
const settings_module_1 = require("./settings/settings.module");
const audit_module_1 = require("./audit/audit.module");
const rooms_module_1 = require("./rooms/rooms.module");
const reservations_module_1 = require("./reservations/reservations.module");
const guests_module_1 = require("./guests/guests.module");
const housekeeping_module_1 = require("./housekeeping/housekeeping.module");
const maintenance_module_1 = require("./maintenance/maintenance.module");
const inventory_module_1 = require("./inventory/inventory.module");
const procurement_module_1 = require("./procurement/procurement.module");
const finance_module_1 = require("./finance/finance.module");
const reporting_module_1 = require("./reporting/reporting.module");
const dashboard_module_1 = require("./dashboard/dashboard.module");
const crm_module_1 = require("./crm/crm.module");
const marketing_module_1 = require("./marketing/marketing.module");
const automation_module_1 = require("./automation/automation.module");
const halls_module_1 = require("./halls/halls.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true
            }),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            hotels_module_1.HotelsModule,
            roles_module_1.RolesModule,
            settings_module_1.SettingsModule,
            audit_module_1.AuditModule,
            rooms_module_1.RoomsModule,
            reservations_module_1.ReservationsModule,
            guests_module_1.GuestsModule,
            housekeeping_module_1.HousekeepingModule,
            maintenance_module_1.MaintenanceModule,
            inventory_module_1.InventoryModule,
            procurement_module_1.ProcurementModule,
            finance_module_1.FinanceModule,
            reporting_module_1.ReportingModule,
            dashboard_module_1.DashboardModule,
            crm_module_1.CrmModule,
            marketing_module_1.MarketingModule,
            automation_module_1.AutomationModule,
            halls_module_1.HallsModule
        ]
    })
], AppModule);
//# sourceMappingURL=app.module.js.map