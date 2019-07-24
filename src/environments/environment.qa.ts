// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const ENV = 'qa';

/* tslint:disable */
export const environment = {
  production: false,

  auth: {
    // url: ''
    url: 'https://bams-bulkReporting-nonprod-authfa.azurewebsites.net'
  },

  merchants: {
    // listPostUrl: 'https://bams-cep-anet-qa-ue-aks.eastus.cloudapp.azure.com/core/api/v1/support/list/merchants',
    // getUrl: 'https://bams-cep-anet-qa-ue-aks.eastus.cloudapp.azure.com/core/api/v1/support/merchant/{mid}'
    listPostUrl: 'https://bams-cep-ist-' + ENV + '-ue-aks.eastus.cloudapp.azure.com/core/api/v1/cep-support/merchants/',
  },

  merchantDetails: {
    detailsGetUrl: 'https://bams-cep-ist-' + ENV + '-ue-aks.eastus.cloudapp.azure.com/core/api/v1/cep-support/merchants/{merchantId}',
    statementsGetUrl: 'https://bams-cep-ist-' + ENV + '-ue-aks.eastus.cloudapp.azure.com/core/api/v1/cep-support/merchants/{merchantId}/statementDates?statementType=Location&dateFrom={dateFrom}&dateTo={dateTo}',
    statementGetUrl: 'https://bams-cep-ist-' + ENV + '-ue-aks.eastus.cloudapp.azure.com/core/api/v1/cep-support/merchants/{merchantId}/statement-documents/{key}',

    notesGetUrl: 'https://bams-cep-ist-' + ENV + '-ue-aks.eastus.cloudapp.azure.com/core/api/v1/cep-support/support-notes/get?appRefNo={appRefNo}',
    notesPostUrl: 'https://bams-cep-ist-' + ENV + '-ue-aks.eastus.cloudapp.azure.com/core/api/v1/cep-support/support-notes/save'

    // orderDetailsUrl: 'http://bams-cep-franchise-dev-ue-aks.eastus.cloudapp.azure.com/core/api/v1/merchant/orderHistory?orderId={order_id}',

    // ocpApimSubscriptionKey: '7b46d6296b674122b4737b0308312b93'
  },

  users: {
    listPostUrl: 'https://bams-cep-ist-' + ENV + '-ue-aks.eastus.cloudapp.azure.com/core/api/v1/cep-support/list/user',
    createUrl: 'https://bams-cep-ist-' + ENV + '-ue-aks.eastus.cloudapp.azure.com/core/api/v1/cep-support/user',
    userUrl: 'https://bams-cep-ist-' + ENV + '-ue-aks.eastus.cloudapp.azure.com/core/api/v1/cep-support/user/{user_id}',
    userEmailUrl: 'https://bams-cep-ist-' + ENV + '-ue-aks.eastus.cloudapp.azure.com/core/api/v1/cep-support/user/get-by-email/',

    profileGetUrl: 'https://bams-cep-ist-' + ENV + '-ue-aks.eastus.cloudapp.azure.com/core/api/v1/cep-support/profile/get-user-profile/{user_id}',
    profileSetUrl: 'https://bams-cep-ist-' + ENV + '-ue-aks.eastus.cloudapp.azure.com/core/api/v1/cep-support/profile/save-user-profile/{user_id}'
  },

  faqs: {
    listPostUrl: 'https://bams-cep-ist-' + ENV + '-ue-aks.eastus.cloudapp.azure.com/core/api/v1/cep-support/list/supportFAQ',
    createUrl: 'https://bams-cep-ist-' + ENV + '-ue-aks.eastus.cloudapp.azure.com/core/api/v1/cep-support/supportFAQ'
  },

  tickets: {
    listPostUrl: 'https://bams-cep-ist-' + ENV + '-ue-aks.eastus.cloudapp.azure.com/core/api/v1/cep-support/list/ticket',
    ticketGetUrl: 'https://bams-cep-ist-' + ENV + '-ue-aks.eastus.cloudapp.azure.com/core/api/v1/cep-support/{ticket/{ticket_id}',
    createPostUrl: 'https://bams-cep-ist-' + ENV + '-ue-aks.eastus.cloudapp.azure.com/core/api/v1/cep-support/ticket',
    ticketDeleteUrl: 'https://bams-cep-ist-' + ENV + '-ue-aks.eastus.cloudapp.azure.com/core/api/v1/cep-support/ticket/{ticket_id}',
    assignPostUrl: 'https://bams-cep-ist-' + ENV + '-ue-aks.eastus.cloudapp.azure.com/core/api/v1/cep-support/ticket/{ticket_id}/assign/{user_id}',
    statusPostUrl: 'https://bams-cep-ist-' + ENV + '-ue-aks.eastus.cloudapp.azure.com/core/api/v1/cep-support/ticket/{ticket_id}/status/{status}',
    priorityPostUrl: 'https://bams-cep-ist-' + ENV + '-ue-aks.eastus.cloudapp.azure.com/core/api/v1/cep-support/ticket/{ticket_id}/priority/{priority}',
    listCommentsUrl: 'https://bams-cep-ist-' + ENV + '-ue-aks.eastus.cloudapp.azure.com/core/api/v1/cep-support/ticket/{ticket_id}/post',
    createCommentUrl: 'https://bams-cep-ist-' + ENV + '-ue-aks.eastus.cloudapp.azure.com/core/api/v1/cep-support/post',

    uploadUrl: 'https://bams-cep-ist-' + ENV + '-ue-aks.eastus.cloudapp.azure.com/core/api/v1/cep-support/ticket/{ticket_id}/attachment',
    downloadUrl: 'https://bams-cep-ist-' + ENV + '-ue-aks.eastus.cloudapp.azure.com/core/api/v1/cep-support/attachment/{attachment_id}'
  },

  reports: {
    boUrl: 'https://bams-cep-franchise-' + ENV + '-ue-fa.azurewebsites.net/api/postBoCsv/a6986845-b4fa-4c29-a912-57696d75ab62?code=Zlz0Hn1mpKFrIsE0B/xOZPYgb2pxkXqHFa61DBJjN29JiKLNxx27Ew=='
  }
};
