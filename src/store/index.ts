import {AnyAction, CombinedState, combineReducers} from 'redux';
import {
  IAppState,
  ICompanyState,
  IContractState,
  IDocumentsState,
  IHomeState,
  INewsState,
  IPlanState,
  IProjectDetailState,
  IScheduleState,
  ISurveyState,
  ITicketState,
  IUserState,
} from 'types';
import {app, AppTypes} from './app';
import {company} from './company';
import {contract} from './contract';
import {document} from './document';
import {home} from './home';
import {news} from './news';
import {plans} from './plans';
import {project} from './projectdetail';
import {schedule} from './schedule';
import {survey} from './survey';
import {ticket} from './ticket';
import {user} from './user';

const appReducer = combineReducers({
  app,
  user,
  home,
  news,
  survey,
  ticket,
  schedule,
  contract,
  project,
  plans,
  document,
  company,
});

export default function (
  state:
    | CombinedState<{
        app: IAppState;
        user: IUserState;
        home: IHomeState;
        company: ICompanyState;
        news: INewsState;
        survey: ISurveyState;
        ticket: ITicketState;
        schedule: IScheduleState;
        contract: IContractState;
        project: IProjectDetailState;
        plans: IPlanState;
        document: IDocumentsState;
      }>
    | undefined,
  action: AnyAction,
) {
  if (
    action.type === AppTypes.LOGOUT_REQUEST ||
    action.type === AppTypes.LOGOUT_SUCCESS
  ) {
    state = undefined;
  }

  return appReducer(state, action);
}
