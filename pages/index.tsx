import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import { Subject } from '../lib/data';

const Home: NextPage = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  useEffect(() => {
    fetch('/api/xlsx')
      .then((res) => res.json())
      .then((data) => {
        setSubjects(data);
      });
  }, []);
  let subjectMapped = subjects.map((subject) => {
    return {
      name: subject.name,
      questions: subject.questions.map((question) => {
        return {
          question: question,
          responses: subject.responses.map((response) => {
            return response[subject.questions.indexOf(question)];
          }),
        };
      }),
    };
  });
  console.log(subjectMapped);
  return (
    <div>
      <div>
        <h1>Subjects</h1>
      </div>
      <div>
        {subjects.map((subject) => (
          <div key={subject.name}>
            <h3>{subject.name}</h3>
            <p>Average:</p>
            <div>
              {subject.questions.map((question, i) => {
                let responses = subject.responses.map((response) => {
                  return response[i];
                });
                let responsesSum = (
                  responses.reduce((a, b) => a + b, 0) / responses.length
                ).toFixed(2);
                return <div key={question}>{responsesSum}</div>;
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
