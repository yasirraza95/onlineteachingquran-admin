import React from 'react'
import "./Cards.css";
import UserService from '../../services/user.service';
import { useState } from 'react';
import { useEffect } from 'react';
import AdminListService from '../../services/admin-list.service';
export default function Cards() {
  const [loading, setLoading] = useState(true);
  const [sliderCounter, setSliderCounter] = useState("");
  const [serviceDonor, setServiceCounter] = useState("");

  useEffect(() => {
    const resultData = async () => {
      const response = await AdminListService.totalSlider();
      setSliderCounter(response.data.response);
      setLoading(false);
    }
    setSliderCounter("0");
    setLoading(false);
    resultData();
  }, []);

  useEffect(() => {
    const resultData = async () => {
      const response = await AdminListService.totalService();
      setServiceCounter(response.data.response);
      setLoading(false);
    }
    setServiceCounter("0");
    setLoading(false);
    resultData();
  }, []);

  return (
    <div className="container cards">
      <div className="gradient-cards">
        <div className="card">
          <div className="container-card bg-green-box">
            <div className="row">
              <div className="request-count">
                <h1 className="shadow">{sliderCounter}<sup></sup></h1>
              </div>
            </div>
            <p className="card-title" style={{ color: "#1565c0" }}>
              <i class="bi bi-image"></i> Sliders</p>
          </div>
        </div>

        <div className="card">
          <div className="container-card bg-blue-box">
            <div className="row">
              <div className="donor-count">
                <h1 className="shadow2">{serviceDonor}<sup></sup></h1>
              </div>
            </div>
            <p className="card-title" style={{ color: "#ea062b" }}>
              <i class='fas fa-gear'></i> Services</p>
          </div>
        </div>
      </div>
    </div>
  )
}
