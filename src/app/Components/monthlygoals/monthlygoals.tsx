"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from '../ui/progress';
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Target,
  Calendar,
  Plus,
  Layout,
  Eye,
  Edit2,
  Check,
  X
} from 'lucide-react';

export interface GoalData {
  id: string;
  title: string;
  state: 'new' | 'progress' | 'done';
  progress: number;
  category: string;
  totalDays: number;
  daysLeft: number;
  streak: number;
}

const initialGoals: GoalData[] = [
  {
    id: 'goal-1',
    title: 'Daily Yoga Practice',
    state: 'progress',
    progress: 65,
    category: 'Learning',
    totalDays: 90,
    daysLeft: 45,
    streak: 7
  },
  {
    id: 'goal-2',
    title: 'Daily Meditation Practice',
    state: 'new',
    progress: 20,
    category: 'Wellness',
    totalDays: 30,
    daysLeft: 25,
    streak: 3
  }
];

const GoalTracker: React.FC = () => {
  const [goals, setGoals] = useState<GoalData[]>(initialGoals);
  const [showInputForm, setShowInputForm] = useState(false);

  const handleGoalSubmit = (formData: Omit<GoalData, 'id' | 'daysLeft' | 'streak'>) => {
    const newGoal: GoalData = {
      ...formData,
      id: `goal-${goals.length + 1}`,
      daysLeft: formData.totalDays,
      streak: 0
    };
    setGoals([...goals, newGoal]);
    setShowInputForm(false);
  };

  const handleDeleteGoal = (goalId: string) => {
    setGoals(goals.filter(goal => goal.id !== goalId));
  };

  const handleUpdateGoal = (updatedGoal: GoalData) => {
    setGoals(goals.map(goal => 
      goal.id === updatedGoal.id ? updatedGoal : goal
    ));
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Target className="h-7 w-7 text-blue-600" />
          <h2 className="text-3xl font-bold text-gray-900">Goal Tracker</h2>
        </div>
        <Button 
          onClick={() => setShowInputForm(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add New Goal
        </Button>
      </div>

      {showInputForm && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Create New Goal</CardTitle>
          </CardHeader>
          <CardContent>
            <GoalInputForm onSubmit={handleGoalSubmit} />
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal) => (
          <GoalCard 
            key={goal.id} 
            goal={goal} 
            onDelete={handleDeleteGoal}
            onUpdate={handleUpdateGoal}
          />
        ))}
      </div>
    </div>
  );
};

const GoalCard: React.FC<{
  goal: GoalData;
  onDelete: (id: string) => void;
  onUpdate: (goal: GoalData) => void;
}> = ({ goal, onDelete, onUpdate }) => {
  const [isEditingState, setIsEditingState] = useState(false);
  const [isEditingProgress, setIsEditingProgress] = useState(false);
  const [tempState, setTempState] = useState(goal.state);
  const [tempProgress, setTempProgress] = useState(goal.progress);

  const states: ('new' | 'progress' | 'done')[] = ['new', 'progress', 'done'];

  const getStateColor = (state: string) => {
    switch (state) {
      case 'new': return 'bg-blue-100 text-blue-600';
      case 'progress': return 'bg-orange-100 text-orange-600';
      case 'done': return 'bg-green-100 text-green-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const handleStateSubmit = () => {
    onUpdate({ ...goal, state: tempState });
    setIsEditingState(false);
  };

  const handleProgressSubmit = () => {
    onUpdate({ ...goal, progress: tempProgress });
    setIsEditingProgress(false);
  };

  const handleProgressChange = (value: string) => {
    const progress = Math.min(100, Math.max(0, Number(value)));
    setTempProgress(progress);
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-4 px-5">
  <div className="flex justify-between items-start gap-4">
    <CardTitle className="text-lg font-semibold text-gray-800 leading-tight">
      {goal.title}
    </CardTitle>
    <div className="flex items-center gap-3">
      {isEditingState ? (
        <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1.5 border border-gray-100 shadow-sm">
          <select
            value={tempState}
            onChange={(e) => setTempState(e.target.value as GoalData['state'])}
            className="rounded-md border border-gray-200 px-3 py-1.5 text-sm bg-white hover:border-blue-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors duration-200 min-w-[100px]"
          >
            {states.map((state) => (
              <option key={state} value={state}>
                {state.charAt(0).toUpperCase() + state.slice(1)}
              </option>
            ))}
          </select>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-9 w-9 p-0 rounded-full hover:bg-green-50 hover:text-green-600 transition-colors duration-200"
              onClick={handleStateSubmit}
            >
              <Check className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-9 w-9 p-0 rounded-full hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
              onClick={() => {
                setTempState(goal.state);
                setIsEditingState(false);
              }}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Badge 
            className={`${getStateColor(goal.state)} px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 hover:opacity-80`}
          >
            {goal.state.charAt(0).toUpperCase() + goal.state.slice(1)}
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            className="h-9 w-9 p-0 rounded-full hover:bg-gray-100 text-gray-600 hover:text-blue-600 transition-all duration-200"
            onClick={() => setIsEditingState(true)}
          >
            <Edit2 className="h-4 w-4" />
          </Button>
        </div>
      )}
      <Button
        variant="ghost"
        size="sm"
        className="h-9 w-9 p-0 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-600 transition-all duration-200 ml-1"
        onClick={() => onDelete(goal.id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </Button>
    </div>
  </div>
</CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span>Progress</span>
            {isEditingProgress ? (
              <div className="flex items-center gap-1">
                <Input
                  type="number"
                  value={tempProgress}
                  onChange={(e) => handleProgressChange(e.target.value)}
                  className="w-20 h-7 text-sm"
                  min="0"
                  max="100"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-green-600"
                  onClick={handleProgressSubmit}
                >
                  <Check className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-red-600"
                  onClick={() => {
                    setTempProgress(goal.progress);
                    setIsEditingProgress(false);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <span>{goal.progress}%</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-gray-500 hover:text-blue-600"
                  onClick={() => setIsEditingProgress(true)}
                >
                  <Edit2 className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>
          <Progress 
            value={goal.progress} 
            className={`h-2 ${
              goal.progress >= 80 ? '[&>div]:bg-green-500' : 
              goal.progress >= 50 ? '[&>div]:bg-blue-500' : '[&>div]:bg-orange-500'
            }`}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Badge className="text-sm">
              {goal.category}
            </Badge>
          </div>
          <div className="flex items-center gap-2 justify-end text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>{goal.daysLeft} days left</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};


const GoalInputForm: React.FC<{
  onSubmit: (goal: Omit<GoalData, 'id' | 'daysLeft' | 'streak'>) => void;
}> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    state: 'new' as const,
    progress: 0,
    category: '',
    totalDays: 0
  });

  const categories = ['Learning', 'Wellness', 'Fitness', 'Personal', 'Career'];
  const states = ['new', 'progress', 'done'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'progress' || name === 'totalDays' ? Number(value) : value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Layout className="h-4 w-4 text-blue-500" />
            Goal Title
          </label>
          <Input
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter your goal title"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">State</label>
          <select
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            className="w-full rounded-md border border-gray-200 p-2"
            required
          >
            {states.map((state) => (
              <option key={state} value={state}>
                {state.charAt(0).toUpperCase() + state.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Progress (%)</label>
          <Input
            type="number"
            name="progress"
            value={formData.progress}
            onChange={handleInputChange}
            min="0"
            max="100"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full rounded-md border border-gray-200 p-2"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Total Days</label>
          <Input
            type="number"
            name="totalDays"
            value={formData.totalDays}
            onChange={handleInputChange}
            min="1"
            required
          />
        </div>

        <Button 
          type="submit"
          className="w-full"
        >
          Create Goal
        </Button>
      </div>

      <div className="border-l pl-6">
        <div className="flex items-center gap-2 mb-4">
          <Eye className="h-4 w-4 text-blue-500" />
          <h3 className="text-lg font-semibold">Goal Preview</h3>
        </div>
        <GoalCard 
                  goal={{
                      id: 'preview',
                      ...formData,
                      daysLeft: formData.totalDays,
                      streak: 0
                  }}
                  onDelete={() => { } } onUpdate={function (goal: GoalData): void {
                      throw new Error('Function not implemented.');
                  } }        />
      </div>
    </form>
  );
};

export default GoalTracker;