// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

/* tslint:disable */
export const environment = {
  production: false,

  auth: {
    // url: ''
    url: 'https://bams-cep-ist-dev-ue-fa.azurewebsites.net'
  },

  merchants: {
    // listPostUrl: 'https://bams-cep-anet-dev-ue-aks.eastus.cloudapp.azure.com/core/api/v1/support/list/merchants',
    // getUrl: 'https://bams-cep-anet-dev-ue-aks.eastus.cloudapp.azure.com/core/api/v1/support/merchant/{mid}'
    listPostUrl: 'https://bams-cep-bamspurch-uat-ue-aks.eastus.cloudapp.azure.com/core/api/v1/support/list/merchants',
    getUrl:      'https://bams-cep-bamspurch-uat-ue-aks.eastus.cloudapp.azure.com/core/api/v1/support/merchant/{mid}'
  },

  merchantDetails: {
    detailsGetUrl: 'https://bams-cep-ist-dev-ue-aks.eastus.cloudapp.azure.com/core/api/v1/cep-support/merchants/{merchantId}',
    statementsGetUrl: 'https://cep-support-dev-api-management.azure-api.net/core/api/v1/cep-support/merchants/{merchantId}/statementDates?statementType=Location&dateFrom={dateFrom}&dateTo={dateTo}',
    statementGetUrl: 'https://cep-support-dev-api-management.azure-api.net/core/api/v1/cep-support/merchants/{merchantId}/statement-documents/{key}',

    ocpApimSubscriptionKey: '7b46d6296b674122b4737b0308312b93'
  },

  users: {
    listPostUrl: 'https://bams-cep-ist-dev-ue-aks.eastus.cloudapp.azure.com/core/api/v1/cep-support/list/user',
    createUrl: 'https://bams-cep-ist-dev-ue-aks.eastus.cloudapp.azure.com/core/api/v1/cep-support/user',
    userUrl: 'https://bams-cep-ist-dev-ue-aks.eastus.cloudapp.azure.com/core/api/v1/cep-support/user/{user_id}',
    userEmailUrl: 'https://bams-cep-ist-dev-ue-aks.eastus.cloudapp.azure.com/core/api/v1/cep-support/user/get-by-email/',

    profileGetUrl: 'https://bams-cep-ist-dev-ue-aks.eastus.cloudapp.azure.com/core/api/v1/cep-support/ANET/profile/get-user-profile/{user_id}',
    profileSetUrl: 'https://bams-cep-ist-dev-ue-aks.eastus.cloudapp.azure.com/core/api/v1/cep-support/ANET/profile/save-user-profile/{user_id}'
  },

  faqs: {
    listPostUrl: 'https://bams-cep-ist-dev-ue-aks.eastus.cloudapp.azure.com/core/api/v1/cep-support/list/supportFAQ',
    createUrl: 'https://bams-cep-ist-dev-ue-aks.eastus.cloudapp.azure.com/core/api/v1/cep-support/supportFAQ'
  },

  tickets: {
    listPostUrl: 'https://bams-cep-ist-dev-ue-aks.eastus.cloudapp.azure.com/core/api/v1/cep-support/ANET/list/ticket',
    ticketGetUrl: 'https://bams-cep-ist-dev-ue-aks.eastus.cloudapp.azure.com/core/api/v1/cep-support/ANET/ticket/{ticket_id}',
    createPostUrl: 'https://bams-cep-ist-dev-ue-aks.eastus.cloudapp.azure.com/core/api/v1/cep-support/ANET/ticket',
    ticketDeleteUrl: 'https://bams-cep-ist-dev-ue-aks.eastus.cloudapp.azure.com/core/api/v1/cep-support/ANET/ticket/{ticket_id}',
    assignPostUrl: 'https://bams-cep-ist-dev-ue-aks.eastus.cloudapp.azure.com/core/api/v1/cep-support/ANET/ticket/{ticket_id}/assign/{user_id}',
    statusPostUrl: 'https://bams-cep-ist-dev-ue-aks.eastus.cloudapp.azure.com/core/api/v1/cep-support/ANET/ticket/{ticket_id}/status/{status}',
    priorityPostUrl: 'https://bams-cep-ist-dev-ue-aks.eastus.cloudapp.azure.com/core/api/v1/cep-support/ANET/ticket/{ticket_id}/priority/{priority}',
    listCommentsUrl: 'https://bams-cep-ist-dev-ue-aks.eastus.cloudapp.azure.com/core/api/v1/cep-support/ticket/{ticket_id}/post',
    createCommentUrl: 'https://bams-cep-ist-dev-ue-aks.eastus.cloudapp.azure.com/core/api/v1/cep-support/post',

    uploadUrl: 'https://bams-cep-ist-dev-ue-aks.eastus.cloudapp.azure.com/core/api/v1/cep-support/ANET/ticket/{ticket_id}/attachment',
    downloadUrl: 'https://bams-cep-ist-dev-ue-aks.eastus.cloudapp.azure.com/core/api/v1/cep-support/ANET/attachment/{attachment_id}'
  },

  reports: {
    boUrl: 'https://bams-cep-franchise-dev-ue-fa.azurewebsites.net/api/postBoCsv/a6986845-b4fa-4c29-a912-57696d75ab62?code=Zlz0Hn1mpKFrIsE0B/xOZPYgb2pxkXqHFa61DBJjN29JiKLNxx27Ew=='
  }
};
