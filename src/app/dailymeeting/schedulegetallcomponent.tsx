'use client';
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, ExternalLink } from 'lucide-react';

interface Participant {
  userid?: string;
  name: string;
  email: string;
  avatar?: string;
}

interface Meeting {
  _id: string;
  topic: string;
  start_time: string;
  link: string;
  duration: string | number;
  participants?: Participant[];
  userId?: string;
  courseId?: string;
  meetingDate?: string | null;
  day?: number;
  meetingLink?: string;
}

const ScheduleSection = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/schedule');
        if (!response.ok) throw new Error('Failed to fetch meetings');
        const data = await response.json();
        
        // Sort meetings by start_time, newest first
        const sortedMeetings = data.sort((a: Meeting, b: Meeting) => {
          const dateA = new Date(a.start_time || 0).getTime();
          const dateB = new Date(b.start_time || 0).getTime();
          return dateB - dateA;
        });
        
        setMeetings(sortedMeetings);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load meetings');
      } finally {
        setLoading(false);
      }
    };

    fetchMeetings();
  }, []);

  const formatDuration = (duration: string | number) => {
    if (typeof duration === 'number') return `${duration} min`;
    return duration;
  };

  const formatDateTime = (dateTimeStr: string) => {
    try {
      const date = new Date(dateTimeStr);
      if (isNaN(date.getTime())) return 'Invalid date';

      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const month = months[date.getMonth()];
      const day = date.getDate().toString().padStart(2, '0');
      const year = date.getFullYear();
      const hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12;

      return `${month} ${day}, ${year} ${formattedHours}:${minutes} ${ampm}`;
    } catch {
      return 'Invalid date';
    }
  };

  if (loading) {
    return (
      <div className="p-4 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500 text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="max-h-[calc(100vh-200px)] overflow-hidden flex flex-col">
      <div className="bg-white sticky top-0 z-10 p-4 border-b">
        <h2 className="text-xl font-semibold text-gray-800">Upcoming Meetings</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {meetings.map((meeting) => (
          <div
            key={meeting._id}
            className="bg-white rounded-lg shadow-md p-4 border border-gray-100 hover:border-blue-200 transition-colors duration-200"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-800">{meeting.topic}</h3>
                
                <div className="mt-2 space-y-2">
                  {meeting.start_time && (
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{formatDateTime(meeting.start_time)}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{formatDuration(meeting.duration)}</span>
                  </div>

                  {meeting.participants && meeting.participants.length > 0 && (
                    <div className="flex items-center text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      <div className="flex items-center space-x-2">
                        <div className="flex -space-x-2">
                          {meeting.participants.map((participant, index) => (
                            <div
                              key={index}
                              className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center"
                              title={participant.name}
                            >
                              {participant.avatar ? (
                                <img
                                  src={participant.avatar}
                                  alt={participant.name}
                                  className="w-full h-full rounded-full"
                                />
                              ) : (
                                <span className="text-sm font-medium text-blue-600">
                                  {participant.name.charAt(0)}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                        <span className="text-sm">
                          {meeting.participants.length} participant{meeting.participants.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {meeting.link && (
                <a
                  href={meeting.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Join
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleSection;