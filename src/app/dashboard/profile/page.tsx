

import Image from 'next/image';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import { Progress } from '../../../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { PlaceHolderImages } from '../../../lib/placeholder-images';
import { userSkills, userProjects } from '../../../lib/data';
import { Github, Linkedin, Twitter, Share2 } from 'lucide-react';
import Link from 'next/link';

const avatarImage = PlaceHolderImages.find(p => p.id === 'avatar');

export default function ProfilePage() {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      <div className="md:col-span-1 space-y-6">
        <Card>
          <CardContent className="pt-6 flex flex-col items-center text-center">
            {avatarImage && (
               <Image
                src={avatarImage.imageUrl}
                width={96}
                height={96}
                alt="User Avatar"
                data-ai-hint={avatarImage.imageHint}
                className="rounded-full mb-4"
              />
            )}
            <h2 className="text-2xl font-bold">Alex Doe</h2>
            <p className="text-muted-foreground">Full-Stack Developer</p>
            <div className="flex items-center gap-4 mt-4">
              <Button variant="ghost" size="icon"><Twitter className="h-5 w-5"/></Button>
              <Button variant="ghost" size="icon"><Github className="h-5 w-5"/></Button>
              <Button variant="ghost" size="icon"><Linkedin className="h-5 w-5"/></Button>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button className="flex-1">Edit Profile</Button>
            <Button variant="outline" size="icon"><Share2 className="h-4 w-4" /></Button>
          </CardFooter>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>About Me</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">
                    Aspiring software engineer with a passion for building beautiful and functional web applications. Currently diving deep into AI and machine learning.
                </p>
            </CardContent>
        </Card>
      </div>
      <div className="md:col-span-2">
        <Tabs defaultValue="skills">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
          </TabsList>
          <TabsContent value="skills" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>My Skills</CardTitle>
                <CardDescription>Current proficiency levels based on your learning activity.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {userSkills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} aria-label={`${skill.name} proficiency`} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="projects" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>My Projects</CardTitle>
                <CardDescription>A showcase of your best work.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 sm:grid-cols-2">
                {userProjects.map((project) => {
                  const projectImage = PlaceHolderImages.find(p => p.id === project.imageId);
                  return (
                    <Link href={project.url} key={project.id}>
                      <Card>
                         <CardHeader className="p-0">
                          {projectImage && (
                            <Image
                              src={projectImage.imageUrl}
                              alt={project.title}
                              width={600}
                              height={400}
                              data-ai-hint={projectImage.imageHint}
                              className="rounded-t-lg object-cover aspect-[3/2]"
                            />
                          )}
                        </CardHeader>
                        <CardContent className="p-4">
                          <h3 className="font-semibold">{project.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{project.description}</p>
                          <div className="flex flex-wrap gap-2 mt-3">
                              {project.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
