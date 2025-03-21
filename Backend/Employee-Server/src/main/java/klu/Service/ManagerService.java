package klu.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import klu.Model.Manager;
import klu.Repository.ManagerRepo;

@Service
public class ManagerService {

	@Autowired
	private ManagerRepo repo;
	public void addManager(Manager manager) {
		// TODO Auto-generated method stub
		repo.save(manager);
	}
	public List<Manager> getManagers() {
		// TODO Auto-generated method stub
		return repo.findAll();
		
	}
	public Manager findByEmail(String email) {
	    return repo.findByEmail(email);
	}


}
