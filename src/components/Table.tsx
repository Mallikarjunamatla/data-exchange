import React, { SetStateAction, useEffect, useState } from 'react';
// import styles from '../styles/Table.module.css'
import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleDown, faCoffee } from '@fortawesome/free-solid-svg-icons'
import { initialRecordsTypes } from '../interface/types.';
import { deleteArticleAPI, getArticlesAPI, postArticleAPI, signOutAPI } from '../redux/actions/actions';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
type Props = {
 getArticles :()=> any
 deleteArticle : (payload : any)=> void
 postArticle : (payload : any)=> void
 signOut : ()=> void
 user : any
 loading : boolean
 records : any
 Ids : []
};

type StatusProps = {
 status : string
 isChecked : boolean
 setCheckedStatus : React.Dispatch<React.SetStateAction<any>>
}
type checkeStatusType  = {
  Active : boolean
  Closed : boolean
}

const Status =(props : StatusProps)=>{
  const onChangeHandler = (e : React.ChangeEvent<HTMLInputElement>)=>{
   
    if(e.target.name === 'Active'){
      props.setCheckedStatus((prev : object)=> ({...prev,Active : e.target.checked,Closed : false}))
    }
    if(e.target.name === 'Closed'){
      props.setCheckedStatus((prev : object)=> ({...prev,Active : false,Closed : e.target.checked}))
    }
   
     
  }
  return(
    <>
     <li>
      <input 
      name={props.status} 
      type='checkbox'
       onChange={onChangeHandler}
      checked={props.isChecked}
      />
      {props.status}
    </li>
    </>
   
  )
}
type CheckItemProps = {
  company : string
  setSelectedItem : React.Dispatch<React.SetStateAction<initialRecordsTypes[]>>
  record : initialRecordsTypes
  isSelectedAll : boolean
  setSelectedAll : React.Dispatch<React.SetStateAction<boolean>>
  setCheckedCount : React.Dispatch<React.SetStateAction<number>>
  total : number
}
const CheckItem=(props : CheckItemProps): JSX.Element=>{
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(()=>{
    if(props.isSelectedAll){
      setChecked(true)
      props.setSelectedItem((prev)=> [...prev,props.record])
      props.setCheckedCount(props.total)
    }
    if(!props.isSelectedAll){
      setChecked(false)
      props.setSelectedItem((prev)=> prev.filter((record : initialRecordsTypes)=> {
        return record.company !== props.company;
      }))
      props.setCheckedCount(0)
    }
   
  },[props.isSelectedAll])
  const onChangeHandler = (e : React.ChangeEvent<HTMLInputElement>)=>{
      if(props.isSelectedAll && !e.target.checked){
        props.setSelectedAll(false)
        props.setCheckedCount(0);
      }else{
        setChecked(e.target.checked)
        if(e.target.checked){
          props.setSelectedItem((prev)=> [...prev,props.record])
          props.setCheckedCount((prev)=> prev+1);
        }
        else{
          props.setSelectedItem((prev)=> prev.filter((record : initialRecordsTypes)=> {
            return record.company !== props.company;
          }))
          props.setCheckedCount((prev)=> prev-1);

        }
      }
     
   
  }
     return(
       <>
        <li className='list-overflow'>
         <input name={props.company} type='checkbox' onChange={onChangeHandler} checked={checked} />
         {props.company}
       </li>
       </>
      
     )
}
function Table(props: Props) : JSX.Element {
const [isSelectedCompanySort, setSelectCompanySort] = useState<boolean>(false);
const [isSelectedStatusSort, setSelectedStatusSort] = useState<boolean>(false);
const [selectedItems,setSelectedItem] = useState<Array<initialRecordsTypes>>([]);
const [isSelectedAll, setSelectedAll ] = useState<boolean>(false)
const [checkCount, setCheckCount] = useState<number>(0);
const [openModal, setModal] = useState<boolean>(false);
const [initialFormData, setFormData] = useState({
  name : '', company : '',status : '', note : '', memberId : ''})
const[checkedStatus, setCheckedStatus] = useState<any>({"Active" : false,"Closed" : false})
// const [is]
useEffect(()=>{
props.getArticles()
},[])
useEffect(()=>{
  if(checkedStatus.Active){

  }

},[isSelectedStatusSort])
const onClickCompanySort =(e:React.MouseEvent<HTMLButtonElement>)=>{
  setSelectCompanySort((pre)=> !pre);
}
const onClickStatusSort =(e:React.MouseEvent<HTMLButtonElement>)=>{
  setSelectedStatusSort((pre)=> !pre);
}
const selectAll = (e : React.ChangeEvent<HTMLInputElement>)=>{
  // setSelectedAll(pre => !pre)
  if(e.target.checked){
    setSelectedAll(true)
  }
  else{
    setSelectedAll(false);
  }
}
const onDeleteHandler =(id : any, e: React.MouseEvent<HTMLImageElement>)=>{
  const payload = {id}
     props.deleteArticle(payload)
}
const onChangeHandler = (e : React.ChangeEvent<HTMLInputElement>)=>{
    setFormData((prev)=>({...prev, [e.target.name] : e.target.value}))
}
const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault()
  setModal(false)        // const formData = new FormData(e.target.id)
        const payload = {
          ...initialFormData,
          lastUpdated : new Date().toLocaleDateString(),
           memberId : Math.random()*100}
        props.postArticle(payload)
        
}
const  onClose = (e : React.MouseEvent<HTMLInputElement>)=>{
  setModal(false)
}
const logOut = (e : React.MouseEvent<HTMLButtonElement>)=>{
  e.preventDefault();
  props.signOut();
}
  return (
    <div className='main' >
      <NavLink onClick={props.signOut} to='/' className='signOut'>
        signOut
      </NavLink>
      <dialog  className='modal' open={openModal} >
        <form id='form' onSubmit={onSubmitHandler}>
          <h3>Add Memeber</h3>
          <div className='add-member-div' >
          <input required className='input' onChange={onChangeHandler} type='text' value={initialFormData.name} name='name' placeholder='Name' />
          <input required className='input' onChange={onChangeHandler} type='text' value={initialFormData.company} name='company' placeholder='Company' />
          <input required className='input' onChange={onChangeHandler} type='text' value={initialFormData.status} name='status' placeholder='Status'/>
          <input required className='input' onChange={onChangeHandler} type='text' value={initialFormData.note} name='note' placeholder='Note'/>
          <div className='form-sub'>
          <input   type='button' onClick={onClose}  value='Cancel' />
          <input className='sub' type='submit' value='Save' />
          </div>
          </div>     
        </form>
      </dialog>
 <table  className='table-class'  aria-label="team members">
    <thead>
      <tr>
        <th  colSpan={12}>
            Team Members
            <button className='add-memberbutton' onClick={(e: React.MouseEvent)=>setModal(true)} >Add member + </button>
        </th>
      </tr>
      <tr >
        <th >
          <div>
          <button onClick={onClickCompanySort}>
          {`company(${checkCount})`}&nbsp;<FontAwesomeIcon icon={faChevronCircleDown} />
          </button>
          <div className='list-company'>
          <div className='list-div' style={{
             backgroundColor : '#d8d8d8',
             position : 'absolute',
            display : isSelectedCompanySort ? 'block' : 'none',
           zIndex : '1'}}>
          <ul className='unlist'>
              <li><input checked={isSelectedAll} onChange={selectAll} name='select-all' type='checkbox'/>Select All</li>
              {props.records.map((record : initialRecordsTypes)=> <CheckItem key={record.memberId} total={props.records.length} setCheckedCount={setCheckCount} setSelectedAll={setSelectedAll} isSelectedAll={isSelectedAll}  record={record} setSelectedItem={setSelectedItem} company={record.company} />)}
            </ul>
          </div>
          
          </div>
          </div>
        
          {/* <dialog open={isSelectedCompanySort}> */}
           
          {/* </dialog> */}
        </th>
         <th>
          <div>
          <button  onClick={onClickStatusSort}>
          {`Status`}&nbsp;<FontAwesomeIcon icon={faChevronCircleDown} />
          </button>
          <div className='status'>
          <div  style={{
             backgroundColor : '#d8d8d8',
             position : 'absolute',
            display : isSelectedStatusSort ? 'block' : 'none',
           zIndex : '1'}}>
          <ul className='unlist'>
             {Object.keys(checkedStatus).map((status : string)=> <Status setCheckedStatus={setCheckedStatus} key={status} isChecked={checkedStatus[`${status}`]} status={status} />)}
            </ul>
          </div>
          
          </div>
          </div>
        
          {/* <dialog open={isSelectedCompanySort}> */}
           
          {/* </dialog> */}
        </th>
      </tr>
      <tr>
      <th><input type='checkbox' /> </th>
        <th>Name</th>
        <th>Company</th>
        <th>Status</th>
        <th>Last Updated</th>
        <th>Notes</th>
        <th></th>
        <th></th>
      </tr>
    </thead>
    <tbody style={{
     
      width : '100%'
      }} >
      {props.records.length > 0
       && props.records.map((info : any, index : number) => (
        <tr key={info.memberId}>
        <td data-label='select'><input type='checkbox' /> </td>
          <td data-lable='name'  >
              {info.name}
          </td >
          <td  data-lable="com" >
            {info.company}
          </td>
          <td  data-lable={info.status}  >
            {info.status}
          </td>
          <td  data-lable={info.lastUpdated} >
            {info.lastUpdated}
          </td>
          <td  data-lable={info.note} >
            {info.note}
          </td>
          <td data-label='delete'>
          <img onClick={(e : React.MouseEvent<HTMLImageElement>)=>onDeleteHandler(props.Ids[index], e)} style={{width : '15px'}}src='delete.svg' alt='delete' />
          </td>
          <td  >
           
          </td>
        </tr>
      ))}
    </tbody>
  </table>
    </div>
   
  )
}


const mapStateToProps = (state : any) => {
	return {
		user: state.user.user,
		loading: state.records.loading,
		records: state.records.records,
    Ids : state.records.Id
	};
};

const mapDispatchToProps = (dispatch : any) => ({
	getArticles: () => dispatch(getArticlesAPI()),
  postArticle : (payload : any)=> dispatch(postArticleAPI(payload)),
	deleteArticle : (payload: any) => dispatch(deleteArticleAPI(payload)),
  signOut : ()=> dispatch(signOutAPI()),

});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
