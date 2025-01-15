import { DATE_RANGE } from "@/constants/enum";
import http from "@/lib/http";
import { DetailResponseType, ListResponseType } from "@/schemas";
import {
  DashboardOverviewType,
  DashboardPaymentType,
  DashboardSubscriptionType,
} from "@/schemas/dashboard.schema";

const dashboardApi = {
  overview: (filterDateRange: DATE_RANGE = DATE_RANGE.ALL) =>
    http.get<DetailResponseType<DashboardOverviewType>>(
      `/admin/dashboard/overview?dateRange=${filterDateRange}`
    ),

  payments: (filterDateRange: DATE_RANGE = DATE_RANGE.ALL) =>
    http.get<ListResponseType<DashboardPaymentType>>(
      `/admin/dashboard/payments?dateRange=${filterDateRange}`
    ),

  subscriptions: (filterDateRange: DATE_RANGE = DATE_RANGE.ALL) =>
    http.get<ListResponseType<DashboardSubscriptionType>>(
      `/admin/dashboard/subscriptions?dateRange=${filterDateRange}`
    ),

  clientOverview: (filterDateRange: DATE_RANGE = DATE_RANGE.ALL) =>
    http.get<DetailResponseType<DashboardOverviewType>>(
      `/client/dashboard/overview?dateRange=${filterDateRange}`
    ),

  clientPayments: (filterDateRange: DATE_RANGE = DATE_RANGE.ALL) =>
    http.get<ListResponseType<DashboardPaymentType>>(
      `/client/dashboard/payments?dateRange=${filterDateRange}`
    ),

  clientSubscriptions: (filterDateRange: DATE_RANGE = DATE_RANGE.ALL) =>
    http.get<ListResponseType<DashboardSubscriptionType>>(
      `/client/dashboard/subscriptions?dateRange=${filterDateRange}`
    ),
};

export default dashboardApi;
