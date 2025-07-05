import React, { useState } from 'react';
import { TfiReload } from 'react-icons/tfi';
import { PiCirclesFourThin } from 'react-icons/pi';
import { MdDelete } from 'react-icons/md';

function AllButtons({ onSendButton }) {
  const sections = [
    { id: 'acknowledgement', name: 'Acknowledgement' },
    { id: 'api-reference', name: 'API Reference' },
    { id: 'appendix', name: 'Appendix' },
    { id: 'authors', name: 'Authors' },
    { id: 'badges-color-references', name: 'Badges Color References' },
    { id: 'contributing', name: 'Contributing' },
    { id: 'demo', name: 'Demo' },
    { id: 'deployment', name: 'Deployment' },
    { id: 'documentation', name: 'Documentation' },
    { id: 'environment-variables', name: 'Environment Variables' },
    { id: 'faq', name: 'FAQ' },
    { id: 'features', name: 'Features' },
    { id: 'feedback', name: 'Feedback' },
    { id: 'github-profile-about-me', name: 'GitHub Profile - About Me' },
    { id: 'github-profile-links', name: 'GitHub Profile - Links' },
    { id: 'github-profile-others', name: 'GitHub Profile - Others' },
    { id: 'github-profile-skills', name: 'GitHub Profile - Skills' },
    { id: 'installation', name: 'Installation' },
    { id: 'lessons', name: 'Lessons' },
    { id: 'license', name: 'License' },
    { id: 'logo', name: 'Logo' },
    { id: 'optimizations', name: 'Optimizations' },
    { id: 'related-roadmap', name: 'Related Roadmap' },
    { id: 'run-locally', name: 'Run Locally' },
    { id: 'screenshots', name: 'Screenshots' },
    { id: 'support', name: 'Support' },
    { id: 'tech', name: 'Tech' },
    { id: 'running-tests', name: 'Running Tests' },
    { id: 'usage-examples', name: 'Usage / Examples' },
    { id: 'used-by', name: 'Used By' },
  ];

  const [btnsend, setbtnsend] = useState(sections);

  const handleSendButton = (btnObj) => {
    onSendButton(btnObj);
    setbtnsend((prev) => prev.filter((btn) => btn.id !== btnObj.id));
  };

  return (
    <div>
      {btnsend.map((items) => (
        <button
          key={items.id}
          onClick={() => handleSendButton(items)}
          className="flex justify-between items-center border-2 w-[290px] h-10 shadow rounded ml-5 mt-2 px-3 hover:border-blue-600"
        >
          <div className="flex items-center text-black">
            <PiCirclesFourThin size={20} className="mr-2" />
            {items.name}
          </div>
          <div className="flex items-center gap-2 text-gray-600 ">
          </div>
        </button>
      ))}
    </div>
  );
}

export default AllButtons;
