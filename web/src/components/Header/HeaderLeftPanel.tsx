import React from 'react'
import { NavLink, Route, useLocation } from 'react-router-dom'

import ExportMenuItem from '../ExportMenuItem/ExportMenuItem'
import Icon from '../Icon/Icon'
import {
  ProjectPriorityViewOnly,
  ProjectMapViewOnly,
} from '../ViewFilters/ViewFilters'
import { ENTRY_POINTS } from '../../searchParams'

function ActiveEntryPoint({ entryPoint, activeEntryPointAddresses, goToGoal }) {
  const location = useLocation()
  const entryPointsAbsentThisOne = activeEntryPointAddresses
    .filter((headerHash) => headerHash !== entryPoint.headerHash)
    .join(',')
  return (
    <div className="active-entry-point">
      <img src="img/door-open.svg" />
      {/* add title because text-overflow: ellipsis */}
      <div className="active-entry-point-content" title={entryPoint.content} onClick={() => goToGoal(entryPoint.goal_address)}>
        {entryPoint.content}
      </div>
      {/* @ts-ignore */}
      <NavLink
        to={`${location.pathname}?${ENTRY_POINTS}=${entryPointsAbsentThisOne}`}
        className="active-entry-point-close"
      >
        {/* @ts-ignore */}
        <Icon name="x.svg" size="very-small-close" className="grey" />
      </NavLink>
    </div>
  )
}

function HeaderLeftPanel({
  setShowProjectSettingsOpen,
  whoami,
  projectName,
  isExportOpen,
  onClickExport,
  activeEntryPoints,
  goToGoal
}) {
  const activeEntryPointAddresses = activeEntryPoints.map(
    (entryPoint) => entryPoint.headerHash
  )
  return (
    <div className="header-left-panel">
      {/* @ts-ignore */}
      <NavLink to="/" className="home-link logo">
        {/* @ts-ignore */}
        {/* <Icon name="acorn-logo-stroked.svg" className="not-hoverable" /> */}
        <p className="logo-name">acorn</p>
        <div className="logo-name-tag">alpha</div>
      </NavLink>
      {whoami && (
        <Route path="/project">
          <div className="current-project-wrapper">
            <div className="current-project-content">
              <ProjectMapViewOnly>
                {/* @ts-ignore */}
                <Icon name="map.svg" className="view-mode grey not-hoverable" />
              </ProjectMapViewOnly>
              <ProjectPriorityViewOnly>
                {/* @ts-ignore */}
                <Icon
                  name="sort-asc.svg"
                  className="view-mode grey not-hoverable"
                />
              </ProjectPriorityViewOnly>
              <div className="current-project-name">{projectName}</div>
              <div className="divider-line"></div>
              {/* <div
                className="header-open-project-settings"
                
              > */}
              {/* @ts-ignore */}
              <Icon
                name="settings.svg"
                withTooltip
                tooltipText="Project Settings"
                size="header"
                onClick={() => setShowProjectSettingsOpen(true)}
              />
              {/* </div> */}
              <div className="export-wrapper">
                {/* @ts-ignore */}
                <Icon
                  withTooltip
                  tooltipText="Export"
                  name="export.svg"
                  size="header"
                  className={isExportOpen ? 'purple' : ''}
                  onClick={onClickExport}
                />
                {isExportOpen && (
                  <div className="export-list-wrapper">
                    <div>
                      <ExportMenuItem
                        type="json"
                        title="Export as JSON (Importable)"
                        download="acorn-project.json"
                      />
                    </div>
                    <div>
                      <ExportMenuItem
                        type="csv"
                        title="Export as CSV"
                        download="acorn-project.csv"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Current Entry Points Tab */}
          {activeEntryPoints.map((entryPoint) => (
            <ActiveEntryPoint
              key={entryPoint.headerHash}
              entryPoint={entryPoint}
              activeEntryPointAddresses={activeEntryPointAddresses}
              goToGoal={goToGoal}
            />
          ))}
        </Route>
      )}
    </div>
  )
}

export default HeaderLeftPanel