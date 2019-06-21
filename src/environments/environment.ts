// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

/* tslint:disable */
export const environment = {
  production: false,

  auth: {
    url: ''
  },

  merchants: {
    listPostUrl: 'https://bams-cep-anet-dev-ue-aks.eastus.cloudapp.azure.com/core/api/v1/support/list/merchants',
    getUrl: 'https://bams-cep-anet-dev-ue-aks.eastus.cloudapp.azure.com/core/api/v1/support/merchant/{mid}'
  },

  merchantDetails: {
    detailsGetUrl: 'http://bams-cep-supporttool-dev-ue-aks.eastus.cloudapp.azure.com/core/api/v1/cep-support/merchants/{merchantId}',
    statementsGetUrl: 'https://cep-support-dev-api-management.azure-api.net/core/api/v1/cep-support/merchants/{merchantId}/statementDates?statementType=Location&dateFrom={dateFrom}&dateTo={dateTo}',
    statementGetUrl: 'https://cep-support-dev-api-management.azure-api.net/core/api/v1/cep-support/merchants/{merchantId}/statement-documents/{key}',

    ocpApimSubscriptionKey: '7b46d6296b674122b4737b0308312b93'
  },

  users: {
    listPostUrl: 'http://bams-cep-supporttool-dev-ue-aks.eastus.cloudapp.azure.com/core/api/v1/cep-support/list/user',
    createUrl: 'http://bams-cep-supporttool-dev-ue-aks.eastus.cloudapp.azure.com/core/api/v1/cep-support/user',
    userUrl: 'http://bams-cep-supporttool-dev-ue-aks.eastus.cloudapp.azure.com/core/api/v1/cep-support/user/{user_id}',

    profileGetUrl: 'http://bams-cep-supporttool-dev-ue-aks.eastus.cloudapp.azure.com/core/api/v1/cep-support/ANET/profile/get-user-profile/{user_id}',
    profileSetUrl: 'http://bams-cep-supporttool-dev-ue-aks.eastus.cloudapp.azure.com/core/api/v1/cep-support/ANET/profile/save-user-profile/{user_id}'
  },

  faqs: {
    listPostUrl: 'http://bams-cep-supporttool-dev-ue-aks.eastus.cloudapp.azure.com/core/api/v1/cep-support/list/supportFAQ',
    createUrl: 'http://bams-cep-supporttool-dev-ue-aks.eastus.cloudapp.azure.com/core/api/v1/cep-support/supportFAQ'
  },

  tickets: {
    listPostUrl: 'http://bams-cep-supporttool-dev-ue-aks.eastus.cloudapp.azure.com/core/api/v1/cep-support/ANET/list/ticket',
    ticketGetUrl: 'http://bams-cep-supporttool-dev-ue-aks.eastus.cloudapp.azure.com/core/api/v1/cep-support/ANET/ticket/{ticket_id}',
    createPostUrl: 'http://bams-cep-supporttool-dev-ue-aks.eastus.cloudapp.azure.com/core/api/v1/cep-support/ANET/ticket',
    ticketDeleteUrl: 'http://bams-cep-supporttool-dev-ue-aks.eastus.cloudapp.azure.com/core/api/v1/cep-support/ANET/ticket/{ticket_id}',
    assignPostUrl: 'http://bams-cep-supporttool-dev-ue-aks.eastus.cloudapp.azure.com/core/api/v1/cep-support/ANET/ticket/{ticket_id}/assign/{user_id}',
    statusPostUrl: 'http://bams-cep-supporttool-dev-ue-aks.eastus.cloudapp.azure.com/core/api/v1/cep-support/ANET/ticket/{ticket_id}/status/{status}',
    priorityPostUrl: 'http://bams-cep-supporttool-dev-ue-aks.eastus.cloudapp.azure.com/core/api/v1/cep-support/ANET/ticket/{ticket_id}/priority/{priority}',
    listCommentsUrl: 'http://bams-cep-supporttool-dev-ue-aks.eastus.cloudapp.azure.com/core/api/v1/cep-support/ticket/{ticket_id}/post',
    createCommentUrl: 'http://bams-cep-supporttool-dev-ue-aks.eastus.cloudapp.azure.com/core/api/v1/cep-support/post',

    uploadUrl: 'http://bams-cep-supporttool-dev-ue-aks.eastus.cloudapp.azure.com/core/api/v1/cep-support/ANET/ticket/{ticket_id}/attachment',
    downloadUrl: 'http://bams-cep-supporttool-dev-ue-aks.eastus.cloudapp.azure.com/core/api/v1/cep-support/ANET/attachment/{attachment_id}'
  }
};
