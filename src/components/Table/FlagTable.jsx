/* eslint-disable react/prop-types */
// FlagTable.jsx
import { useState } from 'react';
import './FlagTable.css';

const FlagTable = ({ data, columns, triggerTypes }) => {
  const [selectedValues, setSelectedValues] = useState({});

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

  const gridTemplateColumns = columns.map(col => col.width || '1fr').join(' ');

  return (
    <div className='flag-table'>
      <div className='table-header' style={{ gridTemplateColumns }}>
        {columns.map((column, index) => (
          <div key={index} className={`header-${column.key}`}>
            {column.title}
          </div>
        ))}
      </div>

      {data.sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className='section'>
          <div className='section-header'>
            <div className='section-title'>{section.title}</div>
            <div className='flag-icons'>
              {triggerTypes.map((trigger, idx) => (
                <span key={idx} className={`${trigger.key}-flag`}>
                  {trigger.icon}
                </span>
              ))}
            </div>
          </div>

          {section.rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className='table-row'
              style={{ gridTemplateColumns }}
            >
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
                {triggerTypes.map((triggerType, idx) => (
                  row.triggers[triggerType.key] && 
                  <div key={idx} className='trigger-group'>
                    <select
                      value={selectedValues[row.checkbox.id]?.[triggerType.key] || ''}
                      onChange={(e) =>
                        handleTriggerChange(
                          row.checkbox.id,
                          triggerType.key,
                          e.target.value
                        )
                      }
                    >
                      <option value=''>Select</option>
                      {row.triggers[triggerType.key]?.options?.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {row.triggers[triggerType.key]?.unit && (
                      <span className='unit'>
                        {row.triggers[triggerType.key].unit}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FlagTable;

