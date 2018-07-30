import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { FormattedMessage } from 'react-intl';
import './ShowCycleData.scss';

class ShowCycleData extends Component {
  render() {
    const { type, build, cycleId, versionName, title,
      description, toDate, environment, fromDate, cycleCaseList, createdName,
      children,
    } = this.props.data;
    const user = createdName ? createdName.split(' ') : ['', ''];
    // 全局数
    let allExectueNum = 0;    
    // 全局执行过的数
    let ExectuedNum = 0;
    Object.keys(cycleCaseList || {}).forEach((key) => {
      if (key !== 'gray') {
        ExectuedNum += cycleCaseList[key];
      }
      allExectueNum += cycleCaseList[key];
    });
    // 循环层的数
    let CycleExectueNum = allExectueNum;    
    children.forEach((child) => {
      let folderExecuteNum = 0;
      Object.keys(child.cycleCaseList || {}).forEach((key) => {
        folderExecuteNum += child.cycleCaseList[key];
      });
      CycleExectueNum -= folderExecuteNum;
    });
    
    return (
      type === 'cycle' ?
        <div className="c7n-right-card-container">
          <div className="c7n-right-card-column">
            <div className="c7n-right-card-item">
              <div className="c7n-right-card-item-label">
                <FormattedMessage id="cycle_build" />   
              ：
              </div>
              <div className="c7n-right-card-item-text">
                {build}
              </div>
            </div>
            <div className="c7n-right-card-item">
              <div className="c7n-right-card-item-label">
                <FormattedMessage id="cycle_startTime" /> ：
              </div>
              <div className="c7n-right-card-item-text">
                {fromDate && moment(fromDate).format('D/MMMM/YY')}
              </div>
            </div>
            <div className="c7n-right-card-item">
              <div className="c7n-right-card-item-label">
                <FormattedMessage id="cycle_totalExecute" /> ：
              </div>
              <div className="c7n-right-card-item-text">
                {allExectueNum}
              </div>
            </div>
            <div className="c7n-right-card-item">
              <div className="c7n-right-card-item-label">
                <FormattedMessage id="cycle_comment" /> ：
              </div>
              <div className="c7n-right-card-item-text">
                {description}
              </div>
            </div>
          </div>
          <div className="c7n-right-card-column">
            <div className="c7n-right-card-item">
              <div className="c7n-right-card-item-label">
                <FormattedMessage id="cycle_environment" />：
              </div>
              <div className="c7n-right-card-item-text">
                {environment}
              </div>
            </div>
            <div className="c7n-right-card-item">
              <div className="c7n-right-card-item-label">
                <FormattedMessage id="cycle_cycleExecute" />：
              </div>
              <div className="c7n-right-card-item-text">
                {CycleExectueNum}
              </div>
            </div>
          </div>
          <div className="c7n-right-card-column">
            <div className="c7n-right-card-item">
              <div className="c7n-right-card-item-label">
                <FormattedMessage id="cycle_createBy" />：
              </div>
              <div className="c7n-right-card-item-text">           
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span className="c7n-avatar">
                    {user[1].slice(0, 1)}
                  </span>
                  <span>
                    {`${user[0]} ${user[1]}`}
                  </span>
                </div>
              </div>
            </div>
            <div className="c7n-right-card-item">
              <div className="c7n-right-card-item-label">
                <FormattedMessage id="cycle_endTime" />：
              </div>
              <div className="c7n-right-card-item-text">
                {toDate && moment(toDate).format('D/MMMM/YY')} 
              </div>
            </div>
            <div className="c7n-right-card-item">
              <div className="c7n-right-card-item-label">
                <FormattedMessage id="cycle_totalExecuted" />：
              </div>
              <div className="c7n-right-card-item-text">
                {ExectuedNum}
              </div>
            </div>
          </div>
        </div> :
        <div className="c7n-right-card-container">
          <div className="c7n-right-card-column">
            <div className="c7n-right-card-item">
              <div className="c7n-right-card-item-label">
                <FormattedMessage id="cycle_totalExecute" />：
              </div>
              <div className="c7n-right-card-item-text">
                {allExectueNum}
              </div>
            </div>
          </div> 
          <div className="c7n-right-card-column">            
            <div className="c7n-right-card-item">
              <div className="c7n-right-card-item-label">
                <FormattedMessage id="cycle_totalExecuted" />：
              </div>
              <div className="c7n-right-card-item-text">
                {ExectuedNum}
              </div>
            </div>       
          </div>
        </div>

    );
  }
}


export default ShowCycleData;
