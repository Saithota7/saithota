import {Component} from 'react'
import Loader from 'react-loader-spinner'

import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {
    listOfProducts: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const covidVaccinationDataApiUrl =
      'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(covidVaccinationDataApiUrl)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        last7DaysVaccination: data.last_7_days_vaccination,
        vaccinationByAge: data.vaccination_by_age,
        vaccinationByGender: data.vaccination_by_gender,
      }
      const {
        last7DaysVaccination,
        vaccinationByAge,
        vaccinationByGender,
      } = updatedData
      const updatedLast7DaysVaccination = last7DaysVaccination.map(each => ({
        vaccineDate: each.vaccine_date,
        dose1: each.dose_1,
        dose2: each.dose_2,
      }))
      const updatedData2 = {
        last7DaysVaccination: updatedLast7DaysVaccination,
        vaccinationByAge,
        vaccinationByGender,
      }
      this.setState({
        listOfProducts: updatedData2,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {listOfProducts} = this.state
    console.log(listOfProducts)
    const {
      last7DaysVaccination,
      vaccinationByAge,
      vaccinationByGender,
    } = listOfProducts
    return (
      <>
        <VaccinationCoverage last7DaysVaccination={last7DaysVaccination} />
        <VaccinationByGender vaccinationByGender={vaccinationByGender} />
        <VaccinationByAge vaccinationByAge={vaccinationByAge} />
      </>
    )
  }

  renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">Something went wrong</h1>
    </div>
  )

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderPart = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {apiStatus} = this.state
    console.log(apiStatus)
    return (
      <div className="bg-container">
        <div>
          <div className="logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              alt="website logo"
              className="website-logo"
            />
            <p className="para">Co-WIN</p>
          </div>
          <h1 className="heading-1">CoWIN Vaccination in india</h1>
          <div className="container-2">{this.renderPart()}</div>
        </div>
      </div>
    )
  }
}

export default CowinDashboard
