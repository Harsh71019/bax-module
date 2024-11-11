/* eslint-disable react/prop-types */
import { useState } from 'react';
import './FlagTable.css';
import useAuthStore from 'host/authStore';

const FlagTable = ({ data }) => {
  const [selectedValues, setSelectedValues] = useState({});
  const authState = useAuthStore((state) => state.authState);

  console.log(authState, 'hahahhahahhah');
  const handleCheckboxChange = (id, checked) => {
    setSelectedValues((prev) => ({
      ...prev,
      [id]: { ...prev[id], checked },
    }));
  };

  const handleTriggerChange = (id, type, value) => {
    setSelectedValues((prev) => ({
      ...prev,
      [id]: { ...prev[id], [type]: value },
    }));
  };

  return (
    <div className='flag-table'>
      <div className='table-header'>
        <div className='header-flag'>Flag Rule</div>
        <div className='header-instructions'>Instructions</div>
        <div className='header-trigger'>Trigger</div>
      </div>

      {data.sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className='section'>
          <div className='section-header'>
            <div className='section-title'>{section.title}</div>
            <div className='flag-icons'>
              <span className='warning-flag'>⚠️</span>
              <span className='critical-flag'>🚫</span>
            </div>
          </div>

          {section.rows.map((row, rowIndex) => (
            <div key={rowIndex} className='table-row'>
              <div className='flag-rule'>
                <label className='checkbox-container'>
                  <input
                    type='checkbox'
                    checked={selectedValues[row.checkbox.id]?.checked || false}
                    onChange={(e) =>
                      handleCheckboxChange(row.checkbox.id, e.target.checked)
                    }
                  />
                  <span className='checkbox-label'>{row.checkbox.label}</span>
                </label>
              </div>

              <div className='instructions'>{row.instruction}</div>

              <div className='triggers'>
                <div className='trigger-group'>
                  <select
                    value={selectedValues[row.checkbox.id]?.warning || ''}
                    onChange={(e) =>
                      handleTriggerChange(
                        row.checkbox.id,
                        'warning',
                        e.target.value
                      )
                    }
                  >
                    <option value=''>Select</option>
                    {row.triggers.warning.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {row.triggers.warning.unit && (
                    <span className='unit'>{row.triggers.warning.unit}</span>
                  )}
                </div>

                <div className='trigger-group'>
                  <select
                    value={selectedValues[row.checkbox.id]?.critical || ''}
                    onChange={(e) =>
                      handleTriggerChange(
                        row.checkbox.id,
                        'critical',
                        e.target.value
                      )
                    }
                  >
                    <option value=''>Select</option>
                    {row.triggers.critical.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {row.triggers.critical.unit && (
                    <span className='unit'>{row.triggers.critical.unit}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FlagTable;
