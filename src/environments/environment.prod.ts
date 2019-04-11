/* tslint:disable */
export const environment = {
  production: true,
 
  // faqGetUrl: 'https://cep-support-dev-api-management.azure-api.net/core/api/v1/support/list/supportFAQ',
  // faqPostUrl: 'https://cep-support-dev-api-management.azure-api.net/core/api/v1/support/supportFAQ',
  faqGetUrl: 'api/supportFAQ',
  faqPostUrl: 'api/supportFAQ',

  merchants: {
    listPostUrl: 'https://anet-dev-api-management.azure-api.net/core/api/v1/support/list/merchants',
    getUrl: 'https://anet-dev-api-management.azure-api.net/core/api/v1/support/merchant/{mid}',

    // listPostUrl: 'api/application',

    // merchantStatementsGetUrl: 'https://cep-support-dev-api-management.azure-api.net/core/api/v1/support/list/statements',
    statementsGetUrl: 'api/statements',

    ocpApimSubscriptionKey: 'e6b34ffa249940aba8ce5086f4273fd1'
  },

  merchantDetails: {
    detailsGetUrl: 'https://cep-support-dev-api-management.azure-api.net/core/api/v1/cep-support/merchants/{merchantId}',
    // merchantStatementsGetUrl: 'https://cep-support-dev-api-management.azure-api.net/core/api/v1/support/list/statements',
    statementsGetUrl: 'api/statements',

    ocpApimSubscriptionKey: '7b46d6296b674122b4737b0308312b93'
  },

  users: {
    listPostUrl: 'https://cep-support-dev-api-management.azure-api.net/core/api/v1/cep-support/list/user',
    createUrl: 'https://cep-support-dev-api-management.azure-api.net/core/api/v1/cep-support/user',
    userUrl: 'https://cep-support-dev-api-management.azure-api.net/core/api/v1/cep-support/user/{user_id}',

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
