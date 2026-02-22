import './masterDataPage.css'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import type { RootState } from '../../store/store'
import type { MasterDataState } from '../../store/masterData/createMasterDataSlice'

type ActionSet = {
  load: () => unknown
  save: () => unknown
  newRecord: () => unknown
  nextRecord: () => unknown
  prevRecord: () => unknown
  searchByCode: (code: string) => unknown
  setDraftField: (payload: { field: 'code' | 'name' | 'secondary'; value: string }) => unknown
  clearError: () => unknown
}

type Props = {
  title: string
  entityTitle: string
  codeLabel: string
  nameLabel: string
  secondaryLabel?: string
  selector: (state: RootState) => MasterDataState
  actions: ActionSet
}

export const MasterDataPage = ({ title, entityTitle, codeLabel, nameLabel, secondaryLabel, selector, actions }: Props) => {
  const dispatch = useAppDispatch()
  const state = useAppSelector(selector)

  useEffect(() => {
    void dispatch(actions.load() as never)
  }, [actions, dispatch])

  return (
    <section className="master-data-page" dir="rtl">
      <h2>{title}</h2>
      <div className="master-data-toolbar">
        <button onClick={() => dispatch(actions.searchByCode(state.draft.code) as never)}>بحث</button>
        <button onClick={() => dispatch(actions.prevRecord() as never)}>السابق</button>
        <button onClick={() => dispatch(actions.nextRecord() as never)}>التالي</button>
        <button onClick={() => void dispatch(actions.save() as never)} disabled={state.loading}>
          حفظ
        </button>
        <button onClick={() => dispatch(actions.newRecord() as never)}>+ كود جديد</button>
      </div>

      <fieldset className="master-data-fieldset">
        <legend>{entityTitle}</legend>
        <label className="master-data-label">
          {codeLabel}
          <input className="master-data-input" value={state.draft.code} onChange={(event) => dispatch(actions.setDraftField({ field: 'code', value: event.target.value }) as never)} />
        </label>

        <label className="master-data-label">
          {nameLabel}
          <input className="master-data-input" value={state.draft.name} onChange={(event) => dispatch(actions.setDraftField({ field: 'name', value: event.target.value }) as never)} />
        </label>

        {secondaryLabel ? (
          <label className="master-data-label">
            {secondaryLabel}
            <input className="master-data-input" value={state.draft.secondary} onChange={(event) => dispatch(actions.setDraftField({ field: 'secondary', value: event.target.value }) as never)} />
          </label>
        ) : null}
      </fieldset>

      {state.error ? (
        <p className="master-data-error" onClick={() => dispatch(actions.clearError() as never)}>
          {state.error}
        </p>
      ) : null}

      <ul className="master-data-list">
        {state.items.map((item) => (
          <li key={item.id}>
            {item.code} - {item.name}
            {item.secondary ? ` - ${item.secondary}` : ''}
          </li>
        ))}
      </ul>
    </section>
  )
}
