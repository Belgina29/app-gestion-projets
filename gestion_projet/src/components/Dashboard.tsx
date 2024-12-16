import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { motion } from 'framer-motion';
import axios from 'axios';

// Interface des props
interface DashboardProps {
  sidebarToggle: boolean;
  setSidebarToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

// Interface des projets récupérés
interface Project {
  id: number;
  title: string;
  description: string;
}

const Dashboard: React.FC<DashboardProps> = ({ sidebarToggle, setSidebarToggle }) => {
  // État pour stocker les projets
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Configuration d'Axios
  const api = axios.create({
    baseURL: 'http://localhost:3000', // Remplace par l'URL de ton API
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Récupération des projets depuis l'API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/projects'); // Assure-toi que "/projects" est le bon endpoint
        setProjects(response.data);
      } catch (err: any) {
        console.error('Erreur API :', err.message);
        setError('Impossible de récupérer les projets');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className={`${sidebarToggle ? '' : 'ml-64'} w-full`}>
      {/* Navbar */}
      <Navbar sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />

      {/* Animation "Welcome" */}
      <div className="flex flex-col items-center justify-center h-screen">
        <motion.h2
          className="text-4xl font-bold text-gray-800 mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            ease: 'easeOut',
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        >
          Welcome to the Dashboard
        </motion.h2>

        {/* Affichage des projets */}
        <div className="w-3/4 bg-white rounded shadow p-4">
          <h3 className="text-2xl font-bold text-gray-700 mb-4">Projects</h3>
          {loading ? (
            <p className="text-gray-500">Chargement des projets...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <ul>
              {projects.map((project) => (
                <li key={project.id} className="mb-2 border-b pb-2">
                  <h4 className="text-lg font-semibold text-gray-800">{project.title}</h4>
                  <p className="text-gray-600">{project.description}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
