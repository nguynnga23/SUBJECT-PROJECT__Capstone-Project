# REST API Controllers Documentation

## Overview
Đã tạo thành công 8 REST Controllers với đầy đủ CRUD operations và custom endpoints cho tất cả entities.

## Controllers Created

### 1. ArticleController (`/api/articles`)

#### CRUD Operations:
- `POST /api/articles` - Create new article
- `GET /api/articles/{id}` - Get article by ID
- `GET /api/articles` - Get all articles
- `GET /api/articles/page` - Get articles with pagination
- `PUT /api/articles/{id}` - Update article
- `DELETE /api/articles/{id}` - Delete article

#### Custom Endpoints:
- `GET /api/articles/category/{categoryId}` - Get articles by category
- `GET /api/articles/search/title?title=` - Get articles by exact title
- `GET /api/articles/search/title-containing?keyword=` - Search articles by title
- `GET /api/articles/count` - Get total article count

### 2. CategoryController (`/api/categories`)

#### CRUD Operations:
- `POST /api/categories` - Create new category
- `GET /api/categories/{id}` - Get category by ID
- `GET /api/categories` - Get all categories
- `GET /api/categories/page` - Get categories with pagination
- `PUT /api/categories/{id}` - Update category
- `DELETE /api/categories/{id}` - Delete category

#### Custom Endpoints:
- `GET /api/categories/search/name?name=` - Get category by exact name
- `GET /api/categories/search/name-containing?keyword=` - Search categories by name
- `GET /api/categories/count` - Get total category count

### 3. CrawlerConfigController (`/api/crawler-configs`)

#### CRUD Operations:
- `POST /api/crawler-configs` - Create new crawler config
- `GET /api/crawler-configs/{id}` - Get crawler config by ID
- `GET /api/crawler-configs` - Get all crawler configs
- `GET /api/crawler-configs/page` - Get crawler configs with pagination
- `PUT /api/crawler-configs/{id}` - Update crawler config
- `DELETE /api/crawler-configs/{id}` - Delete crawler config

#### Custom Endpoints:
- `GET /api/crawler-configs/department-website/{departmentWebsiteId}` - Get configs by department website
- `GET /api/crawler-configs/search/title-containing?keyword=` - Search configs by title
- `GET /api/crawler-configs/count` - Get total crawler config count

### 4. DepartmentController (`/api/departments`)

#### CRUD Operations:
- `POST /api/departments` - Create new department
- `GET /api/departments/{id}` - Get department by ID
- `GET /api/departments` - Get all departments
- `GET /api/departments/page` - Get departments with pagination
- `PUT /api/departments/{id}` - Update department
- `DELETE /api/departments/{id}` - Delete department

#### Custom Endpoints:
- `GET /api/departments/search/name?name=` - Get department by exact name
- `GET /api/departments/search/name-containing?keyword=` - Search departments by name
- `GET /api/departments/search/key?keyDepartment=` - Get department by key
- `GET /api/departments/count` - Get total department count

### 5. DepartmentWebsiteController (`/api/department-websites`)

#### CRUD Operations:
- `POST /api/department-websites` - Create new department website
- `GET /api/department-websites/{id}` - Get department website by ID
- `GET /api/department-websites` - Get all department websites
- `GET /api/department-websites/page` - Get department websites with pagination
- `PUT /api/department-websites/{id}` - Update department website
- `DELETE /api/department-websites/{id}` - Delete department website

#### Custom Endpoints:
- `GET /api/department-websites/department/{departmentId}` - Get websites by department
- `GET /api/department-websites/search/url?url=` - Get website by exact URL
- `GET /api/department-websites/search/url-containing?keyword=` - Search websites by URL
- `GET /api/department-websites/count` - Get total department website count

### 6. PermissionController (`/api/permissions`)

#### CRUD Operations:
- `POST /api/permissions` - Create new permission
- `GET /api/permissions/{id}` - Get permission by ID
- `GET /api/permissions` - Get all permissions
- `GET /api/permissions/page` - Get permissions with pagination
- `PUT /api/permissions/{id}` - Update permission
- `DELETE /api/permissions/{id}` - Delete permission

#### Custom Endpoints:
- `GET /api/permissions/search/action?action=` - Get permissions by action
- `GET /api/permissions/search/subject?subject=` - Get permissions by subject
- `GET /api/permissions/search/action-and-subject?action=&subject=` - Get permissions by action and subject
- `GET /api/permissions/count` - Get total permission count

### 7. RoleController (`/api/roles`)

#### CRUD Operations:
- `POST /api/roles` - Create new role
- `GET /api/roles/{id}` - Get role by ID
- `GET /api/roles` - Get all roles
- `GET /api/roles/page` - Get roles with pagination
- `PUT /api/roles/{id}` - Update role
- `DELETE /api/roles/{id}` - Delete role

#### Custom Endpoints:
- `GET /api/roles/search/name?name=` - Get role by exact name
- `GET /api/roles/search/name-containing?keyword=` - Search roles by name
- `GET /api/roles/count` - Get total role count

### 8. UserController (`/api/users`)

#### CRUD Operations:
- `POST /api/users` - Create new user (with conflict checking)
- `GET /api/users/{id}` - Get user by ID
- `GET /api/users` - Get all users
- `GET /api/users/page` - Get users with pagination
- `PUT /api/users/{id}` - Update user (with conflict checking)
- `DELETE /api/users/{id}` - Delete user

#### Custom Endpoints:
- `GET /api/users/search/username?username=` - Get user by username
- `GET /api/users/search/email?email=` - Get user by email
- `GET /api/users/search/username-containing?keyword=` - Search users by username
- `GET /api/users/department/{departmentId}` - Get users by department
- `GET /api/users/check/username?username=` - Check if username exists
- `GET /api/users/check/email?email=` - Check if email exists
- `GET /api/users/count` - Get total user count

## Common Features

### All Controllers Include:
- ✅ **@RestController** - REST API support
- ✅ **@RequestMapping** - Base URL mapping
- ✅ **@CrossOrigin(origins = "*")** - CORS support
- ✅ **@RequiredArgsConstructor** - Dependency injection
- ✅ **@Slf4j** - Logging support
- ✅ **Exception handling** - Try-catch with proper HTTP status codes
- ✅ **Input validation** - Existence checks before operations
- ✅ **Comprehensive logging** - Request/response logging

### HTTP Status Codes Used:
- **200 OK** - Successful GET, PUT operations
- **201 CREATED** - Successful POST operations
- **204 NO CONTENT** - Successful DELETE operations
- **404 NOT FOUND** - Resource not found
- **409 CONFLICT** - Resource conflict (e.g., duplicate username/email)
- **500 INTERNAL SERVER ERROR** - Server errors

### Pagination Support:
All controllers support Spring Data pagination via `/page` endpoints:
```
GET /api/{resource}/page?page=0&size=10&sort=createdAt,desc
```

### Request/Response Format:
- **Content-Type**: `application/json`
- **Request Body**: JSON representation of entity
- **Response Body**: JSON representation of entity or list of entities

## Example API Calls

### Create Article:
```bash
POST /api/articles
Content-Type: application/json

{
  "title": "Sample Article",
  "content": "Article content...",
  "summary": "Article summary",
  "category": {
    "id": "uuid-here"
  }
}
```

### Get Articles with Pagination:
```bash
GET /api/articles/page?page=0&size=5&sort=createdAt,desc
```

### Search Articles:
```bash
GET /api/articles/search/title-containing?keyword=spring
```

### Update User:
```bash
PUT /api/users/uuid-here
Content-Type: application/json

{
  "username": "newusername",
  "email": "newemail@example.com",
  "password": "newpassword"
}
```

## Security Notes

### TODO - Security Improvements:
1. **Authentication**: Add JWT token validation
2. **Authorization**: Implement role-based access control
3. **Input Validation**: Add `@Valid` annotations and validation constraints
4. **Password Hashing**: Hash passwords before saving users
5. **Rate Limiting**: Add API rate limiting
6. **Audit Logging**: Add audit trails for sensitive operations

### Current CORS Configuration:
- Allows all origins (`*`) - **Should be restricted in production**
- Allows all methods and headers

## File Structure

```
backend/src/main/java/com/backend/controller/
├── ArticleController.java
├── CategoryController.java
├── CrawlerConfigController.java
├── DepartmentController.java
├── DepartmentWebsiteController.java
├── PermissionController.java
├── RoleController.java
└── UserController.java
```

All controllers are ready for integration and testing with frontend applications or API testing tools like Postman.
