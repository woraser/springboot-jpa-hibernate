package charles.system.repository;

import charles.entity.system.User;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by charles.chen on 2015/7/21.
 */
public interface UserRepository extends JpaRepository<User,Long>{
}
