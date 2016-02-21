using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AjaxPersonCars.Data;

namespace AjaxPersonCars.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult AddPerson(Person person)
        {
            var manager = new PersonCarsManager(Properties.Settings.Default.ConStr);
            manager.AddPerson(person);
            return Json(person);
        }

        public ActionResult GetAllPeople()
        {
            var manager = new PersonCarsManager(Properties.Settings.Default.ConStr);
            return Json(manager.GetAllPersons(), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public void AddCar(Car car)
        {
            var manager = new PersonCarsManager(Properties.Settings.Default.ConStr);
            manager.AddCar(car);
        }

        [HttpPost]
        public ActionResult GetCarsForPerson(int personId)
        {
            var manager = new PersonCarsManager(Properties.Settings.Default.ConStr);
            return Json(manager.GetCarsForPerson(personId), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public void DeletePerson(int personId)
        {
            var manager = new PersonCarsManager(Properties.Settings.Default.ConStr);
            manager.DeletePersonAndCars(personId);
        }

    }

}
