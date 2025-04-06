export class ResultModel<T> {
  errors: string[] = [];
  isSuccess: boolean = true;
  status: DomainOperationStatus = DomainOperationStatus.Success;
  value?: T;
}

export enum DomainOperationStatus {
  Success,
  NotFound,
  Failed,
  Unauthorized,
  Conflict,
  ContentTooLarge,
  CriticalDependencyError
}
