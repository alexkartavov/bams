// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

/* tslint:disable */
export const environment = {
  production: false,

  merchants: {
    listPostUrl: 'http://bams-cep-anet-dev-ue-aks.eastus.cloudapp.azure.com/core/api/v1/support/list/merchants',
    getUrl: 'http://bams-cep-anet-dev-ue-aks.eastus.cloudapp.azure.com/core/api/v1/support/merchant/{mid}',

    // listPostUrl: 'api/application',

    ocpApimSubscriptionKey: 'e6b34ffa249940aba8ce5086f4273fd1'
  },

  merchantDetails: {
    detailsGetUrl: 'https://cep-support-dev-api-management.azure-api.net/core/api/v1/cep-support/merchants/{merchantId}',
    // merchantStatementsGetUrl: 'https://cep-support-dev-api-management.azure-api.net/core/api/v1/support/list/statements',
    // statementsGetUrl: 'api/statements',
    statementsGetUrl: 'https://cep-support-dev-api-management.azure-api.net/core/api/v1/cep-support/merchants/{merchantId}/statementDates?statementType=Location&dateFrom={dateFrom}&dateTo={dateTo}',
    statementGetUrl: 'https://cep-support-dev-api-management.azure-api.net/core/api/v1/cep-support/merchants/{merchantId}/statement-documents/{key}',

    ocpApimSubscriptionKey: '7b46d6296b674122b4737b0308312b93'
  },

  users: {
    listPostUrl: 'https://cep-support-dev-api-management.azure-api.net/core/api/v1/cep-support/list/user',
    createUrl: 'https://cep-support-dev-api-management.azure-api.net/core/api/v1/cep-support/user',
    userUrl: 'https://cep-support-dev-api-management.azure-api.net/core/api/v1/cep-support/user/{user_id}',

    profileGetUrl: 'http://bams-cep-supporttool-dev-ue-aks.eastus.cloudapp.azure.com/core/api/v1/cep-support/ANET/profile/get-user-profile/{user_id}',
    profileSetUrl: 'http://bams-cep-supporttool-dev-ue-aks.eastus.cloudapp.azure.com/core/api/v1/cep-support/ANET/profile/save-user-profile/{user_id}',

    // listPostUrl: 'api/user',

    ocpApimSubscriptionKey: '7b46d6296b674122b4737b0308312b93'
  },

  faqs: {
    listPostUrl: 'https://cep-support-dev-api-management.azure-api.net/core/api/v1/cep-support/list/supportFAQ',
    createUrl: 'https://cep-support-dev-api-management.azure-api.net/core/api/v1/cep-support/supportFAQ',

    // listPostUrl: 'api/faq',

    ocpApimSubscriptionKey: '7b46d6296b674122b4737b0308312b93'
  },

  tickets: {
    listPostUrl: 'https://cep-support-dev-api-management.azure-api.net/core/api/v1/cep-support/ANET/list/ticket',
    ticketGetUrl: 'https://cep-support-dev-api-management.azure-api.net/core/api/v1/cep-support/ANET/ticket/{ticket_id}',
    createPostUrl: 'https://cep-support-dev-api-management.azure-api.net/core/api/v1/cep-support/ANET/ticket',
    ticketDeleteUrl: 'https://cep-support-dev-api-management.azure-api.net/core/api/v1/cep-support/ANET/ticket/{ticket_id}',
    assignPostUrl: 'https://cep-support-dev-api-management.azure-api.net/core/api/v1/cep-support/ANET/ticket/{ticket_id}/assign/{user_id}',
    statusPostUrl: 'https://cep-support-dev-api-management.azure-api.net/core/api/v1/cep-support/ANET/ticket/{ticket_id}/status/{status}',
    priorityPostUrl: 'https://cep-support-dev-api-management.azure-api.net/core/api/v1/cep-support/ANET/ticket/{ticket_id}/priority/{priority}',
    listCommentsUrl: 'https://cep-support-dev-api-management.azure-api.net/core/api/v1/cep-support/ticket/{ticket_id}/post',
    createCommentUrl: 'https://cep-support-dev-api-management.azure-api.net/core/api/v1/cep-support/post',

    uploadUrl: 'https://cep-support-dev-api-management.azure-api.net/core/api/v1/cep-support/ANET/ticket/{ticket_id}/attachment',
    downloadUrl: 'https://cep-support-dev-api-management.azure-api.net/core/api/v1/cep-support/ANET/attachment/{attachment_id}',

    // listPostUrl: 'api/ticket',

    ocpApimSubscriptionKey: '7b46d6296b674122b4737b0308312b93'
  },

  ocpApimSubscriptionKey: '3c3aa5b2659b48caafbfae69202eefa4'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
