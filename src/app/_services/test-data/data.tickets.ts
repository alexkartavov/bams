import { SupportTicketModel } from '../../models/support-ticket';

/* tslint:disable */
export const ticketsData: Array<SupportTicketModel> = [
  {
    id: 3,
    mid: 999,
    title: "Type2, Low Priority",
    desc: "This is the description",
    type: "ACCOUNT_QUERY",
    status: "OPEN",
    priority: "LOW",
    merchant: {
      dbaName: "Business A",
      firstName: "John",
      lastName: "Smith",
      phoneNumber: null,
      emailAddress: null,
      channel: "BAMS"
    },
    createdBy: "selva yugandhar",
    createdById: 3,
    updatedBy: "selva yugandhar",
    updatedById: 3,
    assignedTo: null,
    assignedToId: 0,
    createdDate: null,
    updatedDate: null,
    attachments: [],
    assignedDate: null
  },
  {
    id: 4,
    mid: 998,
    title: "Type1, Low Priority",
    desc: "This is the description",
    type: "ACCOUNT_UPDATE",
    status: "OPEN",
    priority: "LOW",
    merchant: {
      dbaName: "Johns Computer Business",
      firstName: "John",
      lastName: "Smith",
      phoneNumber: "1234567890",
      emailAddress: "williamsmith@email.com",
      channel: "BAMS"
    },
    createdBy: "selva yugandhar",
    createdById: 3,
    updatedBy: "selva yugandhar",
    updatedById: 3,
    assignedTo: null,
    assignedToId: 0,
    createdDate: null,
    updatedDate: null,
    attachments: [],
    assignedDate: null
  },
  {
    id: 5,
    mid: 999,
    title: "Type2, Low Priority",
    desc: "This is the description",
    type: "ACCOUNT_QUERY",
    status: "OPEN",
    priority: "LOW",
    merchant: {
      dbaName: "Business A",
      firstName: "John",
      lastName: "Smith",
      phoneNumber: null,
      emailAddress: null,
      channel: "BAMS"
    },
    createdBy: "selva yugandhar",
    createdById: 3,
    updatedBy: "selva yugandhar",
    updatedById: 3,
    assignedTo: null,
    assignedToId: 0,
    createdDate: null,
    updatedDate: null,
    attachments: [],
    assignedDate: null
  },
  {
    id: 6,
    mid: 999,
    title: "Type2, Medium Priority",
    desc: "This is the description",
    type: "ACCOUNT_QUERY",
    status: "OPEN",
    priority: "MEDIUM",
    merchant: {
      dbaName: "Business A",
      firstName: "John",
      lastName: "Smith",
      phoneNumber: null,
      emailAddress: null,
      channel: "BAMS"
    },
    createdBy: "selva yugandhar",
    createdById: 3,
    updatedBy: "selva yugandhar",
    updatedById: 3,
    assignedTo: null,
    assignedToId: 0,
    createdDate: null,
    updatedDate: null,
    attachments: [],
    assignedDate: null
  },
  {
    id: 7,
    mid: 999,
    title: "Type2, HIGH Priority",
    desc: "This is the description",
    type: "ACCOUNT_QUERY",
    status: "IN_PROGRESS",
    priority: "HIGH",
    merchant: {
      dbaName: "Business A",
      firstName: "John",
      lastName: "Smith",
      phoneNumber: null,
      emailAddress: null,
      channel: "BAMS"
    },
    createdBy: "selva yugandhar",
    createdById: 3,
    updatedBy: "selva yugandhar",
    updatedById: 3,
    assignedTo: null,
    assignedToId: 0,
    createdDate: null,
    updatedDate: null,
    attachments: [],
    assignedDate: null
  },
  {
    id: 8,
    mid: 2,
    title: "Type2, HIGH Priority",
    desc: "This is the description",
    type: "ACCOUNT_QUERY",
    status: "OPEN",
    priority: "HIGH",
    merchant: null,
    createdBy: "selva yugandhar",
    createdById: 3,
    updatedBy: "selva yugandhar",
    updatedById: 3,
    assignedTo: null,
    assignedToId: 0,
    createdDate: null,
    updatedDate: null,
    attachments: [],
    assignedDate: null
  },
  {
    id: 9,
    mid: 2,
    title: "Type2, HIGH Priority",
    desc: "This is the description",
    type: "ACCOUNT_QUERY",
    status: "OPEN",
    priority: "HIGH",
    merchant: null,
    createdBy: "selva yugandhar",
    createdById: 3,
    updatedBy: "selva yugandhar",
    updatedById: 3,
    assignedTo: null,
    assignedToId: 0,
    createdDate: null,
    updatedDate: null,
    attachments: [],
    assignedDate: null
  },
  {
    id: 11,
    mid: 123,
    title: "new ticket",
    desc: "where is the money?",
    type: "ACCOUNT_QUERY",
    status: "OPEN",
    priority: "MEDIUM",
    merchant: {
      dbaName: "Johns Computer Business",
      firstName: "John",
      lastName: "Smith",
      phoneNumber: "1234567890",
      emailAddress: "williamsmith@email.com",
      channel: "BAMS"
    },
    createdBy: "selva yugandhar",
    createdById: 3,
    updatedBy: "selva yugandhar",
    updatedById: 3,
    assignedTo: null,
    assignedToId: 0,
    createdDate: null,
    updatedDate: null,
    attachments: [],
    assignedDate: null
  },
  {
    id: 12,
    mid: 123,
    title: "new ticket",
    desc: "where is the money?",
    type: "ACCOUNT_QUERY",
    status: "OPEN",
    priority: "MEDIUM",
    merchant: {
      dbaName: "Johns Computer Business",
      firstName: "John",
      lastName: "Smith",
      phoneNumber: "1234567890",
      emailAddress: "williamsmith@email.com",
      channel: "BAMS"
    },
    createdBy: "selva yugandhar",
    createdById: 3,
    updatedBy: "selva yugandhar",
    updatedById: 3,
    assignedTo: null,
    assignedToId: 0,
    createdDate: null,
    updatedDate: null,
    attachments: [],
    assignedDate: null
  },
  {
    id: 13,
    mid: 123,
    title: "123 / Account Update / John Smith",
    desc: "Lost my wallet",
    type: "ACCOUNT_UPDATE",
    status: "OPEN",
    priority: "LOW",
    merchant: {
      dbaName: "Johns Computer Business",
      firstName: "John",
      lastName: "Smith",
      phoneNumber: "1234567890",
      emailAddress: "williamsmith@email.com",
      channel: "BAMS"
    },
    createdBy: "selva yugandhar",
    createdById: 3,
    updatedBy: "selva yugandhar",
    updatedById: 3,
    assignedTo: null,
    assignedToId: 0,
    createdDate: null,
    updatedDate: null,
    attachments: [],
    assignedDate: null
  }
];
