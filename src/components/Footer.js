import React from 'react'

export default function Footer() {
  return (
    <>
      <footer className="sticky-footer bg-white">
        <div className="container my-auto">
          <div className="copyright text-center my-auto">
            <span>Copyright &copy; {new Date().getFullYear()} Sohel Rana</span>
          </div>
        </div>
      </footer>
      <a className="scroll-to-top rounded" href="#page-top">
        <i className="fas fa-angle-up"></i>
      </a>
    </>
  )
}
