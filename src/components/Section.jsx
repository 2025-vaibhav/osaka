import React from 'react';
import { useSearchParams } from 'react-router-dom';
import VideoLoopBG from './VideoLoopBG';
import Home from '../screens/Home';
import VideoPage from '../screens/VideoPage';
import SelectCraft from '../screens/SelectCraft';
import InfoPage from '../screens/InfoPage';
import Demo from '../screens/Demo';

const Section = ({ sectionId, className }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Get current view for this section
  const currentView = searchParams.get(sectionId) || 'home';
  
  // Function to update this section's view
  const navigateToView = (view, params = {}) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(sectionId, view);
    // Add any additional parameters
    Object.entries(params).forEach(([key, value]) => {
      newParams.set(`${sectionId}_${key}`, value);
    });
    setSearchParams(newParams);
  };

  // Get section-specific parameters
  const getSectionParams = () => {
    const params = {};
    for (const [key, value] of searchParams.entries()) {
      if (key.startsWith(`${sectionId}_`)) {
        params[key.replace(`${sectionId}_`, '')] = value;
      }
    }
    return params;
  };

  // Render appropriate component based on current view
  const renderContent = () => {
    const sectionParams = getSectionParams();
    const props = {
      onNavigate: navigateToView,
      sectionId,
      ...sectionParams
    };

    switch (currentView) {
      case 'video-page':
        return <VideoPage {...props} />;
      case 'select-craft':
        return <SelectCraft {...props} />;
      case 'info-page':
        return <InfoPage {...props} />;
      case 'demo':
        return <Demo {...props} />;
      default:
        return <Home {...props} />;
    }
  };

  return (
    <div className={className}>
      <VideoLoopBG />
      {renderContent()}
    </div>
  );
};

export default Section;