export interface GenerateTokenRequest {
  grantType: string;
  clientId: string;
  clientSecret: string;
  username: string;
  password: string;
}

export interface CreateCaseRequest {
  Subject: string;
  Type: string;
  SuppliedEmail: string;
  SuppliedName: string;
  Description: string;
  Origin: string;
}

export interface CreateCaseAttachmentRequest {
  Title: string;
  FirstPublishLocationId: string;
  VersionData: string;
}
