import {getKindeServerSession} from '@kinde-oss/kinde-auth-nextjs/server';
import {redirect} from 'next/navigation';
import { getUserById, getUsersWithNoConnection } from './neo4j.action';
import HomeClientComponent from './components/Home';

export default async function Home() {
  const {isAuthenticated, getUser} = getKindeServerSession();

  if(!(await isAuthenticated())){
    return redirect(
      "/api/auth/login?post_login_redicrect_url=http://localhost:3000/callback"
    );
  }

  const user = await getUser();

  if(!user){
    return redirect(
      "/api/auth/login?post_login_redicrect_url=http://localhost:3000/callback"
    );
  }

  const usersWithNoConnection = await getUsersWithNoConnection(user.id);
  const currentUser = await getUserById(user.id);
  return (
    <main>
      {currentUser && <HomeClientComponent currentUser={currentUser} users={usersWithNoConnection} />}
      Hi {user.given_name}
    </main>
  );
}