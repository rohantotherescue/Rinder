"use client";
import * as React from 'react';
import {Neo4JUser} from "@/types";
import TinderCard from 'react-tinder-card';
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { neo4jSwipe } from '../neo4j.action';

interface HomeClientComponentProps{
    currentUser: Neo4JUser;
    users: Neo4JUser[];
}

const HomeClientComponent: React.FC<HomeClientComponentProps> = ({
    currentUser,
    users
}) => {
    const handleSwipe = async(dir:string, userId: string) =>{
        const isMatch = await neo4jSwipe(currentUser.applicationId,dir,userId);
        if(isMatch) alert("Congrats! it's a match")
    }
    
    return(
        <div className='w-screen h-screen flex justify-center items-centre'>
            <div>
            <div>
                <h1 className='text-4xl'>
                Hello {currentUser.firstName} {currentUser.lastName}
                </h1>
            </div>
            <div className='mt-4 relative'>
                {users.map((user) =>(
                    <TinderCard onSwipe= {(dir) =>
                        handleSwipe(dir, user.applicationId)
                    }
                    className='absolute' key={user.applicationId}>
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    {user.firstName} {user.lastName}
                                </CardTitle>
                                <CardDescription>
                                    {user.email}
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </TinderCard>
                ))}
            </div>
        </div>
        </div>
    )
}

export default HomeClientComponent;

