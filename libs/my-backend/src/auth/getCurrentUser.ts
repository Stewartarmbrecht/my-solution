import { AuthUser as AwsAuthUser, getCurrentUser as awsGetCurrentUser } from 'aws-amplify/auth';
import { AuthUser } from './AuthUser';
export async function getCurrentUser(): Promise<AuthUser> {
  const awsAuthUser: AwsAuthUser = await awsGetCurrentUser();
  return {
    username: awsAuthUser.username,
    userId: awsAuthUser.userId,
  } as AuthUser;
}